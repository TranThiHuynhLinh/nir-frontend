"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { loginValidation } from "@/app/schema/auth.validate"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { FlatButton } from "@/components/common/flat-button"
import { useAuth } from "@/providers/auth-provider"
import { enums } from "@/utils/constants"

export default function LoginForm() {
    const route = useRouter()
    const { loginContext } = useAuth()
    const [isHidden, setIsHidden] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const toggleHidden = () => setIsHidden(!isHidden)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = {
            email,
            password,
        }
        const error = loginValidation(formData)
        if (error) {
            toast.error(error)
        } else {
            try {
                const role = await loginContext(formData)
                if (role === enums.ROLES.ADMIN) {
                    route.push("/admin/user")
                } else {
                    route.push("/client")
                }
            } catch (err) {
                console.log(err)
            }
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type={isHidden ? "password" : "text"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                    />
                    {isHidden ? (
                        <Eye
                            className="absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={toggleHidden}
                        />
                    ) : (
                        <EyeOff
                            className="absolute top-1/2 right-2 -translate-y-1/2"
                            onClick={toggleHidden}
                        />
                    )}
                </div>
            </div>
            <FlatButton
                type="submit"
                className="w-full text-md"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Login
            </FlatButton>
            <FlatButton
                type="submit"
                className="w-full text-md"
                disabled={isLoading}
                variant={"accent"}
            >
                <IconBrandGoogleFilled className="mr-2" />
                Login with Google
            </FlatButton>
        </form>
    )
}
