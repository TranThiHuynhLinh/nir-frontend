import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "@/components/forms/register-form"

export default async function Page() {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Card className="mx-auto max-w-sm bg-light-card">
                <CardHeader>
                    <CardTitle className="text-xl">Sign up</CardTitle>
                    <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                    <div className="mt-4 text-center text-sm">
                        {"Already have an account?" + " "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
