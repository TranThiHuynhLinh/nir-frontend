import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/forms/login-form"

export default async function Page() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Card className="mx-auto max-w-sm bg-light-card">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm">
                        {"Don't have an account?" + " "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <Link href="/" className="underline mt-4 text-lg">
                Continue as guest
            </Link>
        </div>
    )
}
