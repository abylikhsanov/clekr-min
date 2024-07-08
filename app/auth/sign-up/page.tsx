"use client"
import { FormProvider } from "react-hook-form";
import {useSignUpForm} from "../../../hooks/use-signup-form";
type Props = {};

const Page = (props: Props) => {
    const { methods, onGenerateOTP, onHandleSubmit, loading } = useSignUpForm();
    return (
        <div className="flex flex-1 py-36 md:px-16 w-full">
            <FormProvider {...methods}>
                <form onSubmit={onHandleSubmit()} className="h-full">
                    <h2 className="text-gray-900 md:text-4xl font-bold">Account details</h2>
                    <p className="text-muted-foreground md:text-sm">
                        Enter your account details
                    </p>
                    <div className="flex flex-col p-4 space-y-4 w-full">
                        <input
                            placeholder="Full name"
                            {...methods.register("fullname")}
                        />
                        <input
                            placeholder="Email"
                            {...methods.register("email")}
                        />
                        <input
                            placeholder="Password"
                            {...methods.register("password")}
                        />
                        <button disabled={loading} type="button"
                                onClick={() => onGenerateOTP(methods.getValues("email"), methods.getValues("password"))}>
                            {loading ? ("...") : "Generate otp"}
                        </button>
                        <input
                            placeholder="otp"
                            {...methods.register("otp")}
                        />
                    </div>
                    <button className="text-black" disabled={loading} type="submit">{loading ? ("...") : "Signup"}</button>
                </form>
            </FormProvider>
        </div>
    );
};

export default Page;
