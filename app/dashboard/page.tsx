import {SignOutButton} from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <h2>Dashboard page</h2>
            <SignOutButton redirectUrl={"/"} />
        </div>
    )
}
