"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { RegisterBody, registerValidation } from "@/app/schema/auth.validate"
import { register } from "@/api/auth.api"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import { FlatButton } from "@/components/common/flat-button"

export default function RegisterForm() {
    const route = useRouter()
    const [isHidden, setIsHidden] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<RegisterBody>({
        fullname: "",
        email: "",
        password: "",
        confirm: "",
    })

    const toggleHidden = () => setIsHidden(!isHidden)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const error = registerValidation(formData)
        if (error) {
            toast.error(error)
        } else {
            const sendData = {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
            }
            const res = await register(sendData)

            if (res.status === 201) {
                toast.success("Success!")
                route.push(`/login`)
            } else {
                toast.error(res.response.data.message)
            }
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                    id="fullname"
                    placeholder="Max"
                    required
                    value={formData.fullname}
                    onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={isHidden ? "password" : "text"}
                        required
                        value={formData.password}
                        onChange={handleChange}
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
            <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <div className="relative">
                    <Input
                        id="confirm"
                        type={isHidden ? "password" : "text"}
                        required
                        value={formData.confirm}
                        onChange={handleChange}
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
                Create account
            </FlatButton>
            <FlatButton
                type="submit"
                className="w-full text-md"
                disabled={isLoading}
                variant={"accent"}
            >
                <IconBrandGoogleFilled className="mr-2" />
                Sign up with Google
            </FlatButton>
        </form>
    )
}
