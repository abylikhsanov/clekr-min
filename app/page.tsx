import {SignOutButton} from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <h2>Home page</h2>
            <SignOutButton redirectUrl={"/auth/sign-in"} />
        </div>
    )
}
