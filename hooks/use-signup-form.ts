import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    UserRegistrationProps,
    UserRegistrationSchema,
} from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {},
        mode: "onChange",
    });

    const onGenerateOTP = async (
        email: string,
        password: string,
    ) => {
        if (!isLoaded || loading) return;
        // Check that emailDomain or company name already exists
        try {
            setLoading(true);
            await signUp.create({
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
        }
    };

    const onHandleSubmit = (orderClientId?: string) => {
        return methods.handleSubmit(async (values: UserRegistrationProps) => {
            if (!isLoaded || loading) return;
            try {
                setLoading(true);
                const completeSignUp = await signUp?.attemptEmailAddressVerification({
                    code: values.otp,
                });
                if (completeSignUp.status !== "complete") {
                    return {
                        message: `Clerk complete signup returned status: ${completeSignUp.status}`,
                    };
                }
                if (completeSignUp.status == "complete") {
                    if (!signUp?.createdUserId) return;
                    let registered = null;
                    await setActive({
                        session: completeSignUp.createdSessionId,
                    });
                    // setLoading(false);
                    router.push(`/dashboard`);
                }
            } catch (error: any) {
                console.error("Caught error:", error);

                let errorMessage = "An unexpected error occurred";

                if (error?.errors && error.errors[0]?.longMessage) {
                    errorMessage = error.errors[0].longMessage;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                setLoading(false);
            }
        });
    };

    return {
        methods,
        onHandleSubmit,
        onGenerateOTP,
        loading,
    };
};
