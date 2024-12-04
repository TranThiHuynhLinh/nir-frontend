"use client"

import { RegisterSendBody } from "@/app/schema/auth.validate"
import { FlatButton } from "@/components/common/flat-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    useCreateUserMutation,
    useFetchAllUsersQuery,
} from "@/redux/services/admin/user.api"

import { Loader2 } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"

const initData: RegisterSendBody = {
    email: "",
    fullname: "",
    password: "",
}

export const CreateUserForm = ({ className }: { className?: string }) => {
    const [createUser, { isLoading }] = useCreateUserMutation()

    const [formData, setFormData] = useState<RegisterSendBody>(initData)
    const { fullname, email, password } = formData
    const handleOnChange = (field: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }))
    }

    const handleCreateUser = async () => {
        try {
            await createUser(formData).unwrap()
            toast.success("User created successfully")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to create user")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCreateUser()
        }
    }

    return (
        <div
            className={`flex flex-col gap-y-4 px-6 py-4 bg-light-card rounded-xl shadow-lg max-h-[360px] ${className}`}
        >
            <div className="text-2xl font-semibold text-foreground">
                Create a new account
            </div>
            <div className="text-md font-medium text-foreground/50">
                This account will still have to follow the rules (Fullname,
                Email, Password)
            </div>
            <div className="flex items-center gap-x-2 justify-between">
                <Label htmlFor="create-user-fullname" className="text-md">
                    Fullname
                </Label>
                <Input
                    id="create-user-fullname"
                    required
                    autoComplete="none"
                    value={fullname}
                    onChange={(e) => handleOnChange("fullname", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[72%]"
                />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
                <Label htmlFor="create-user-email" className="text-md">
                    Email
                </Label>
                <Input
                    id="create-user-email"
                    required
                    autoComplete="none"
                    value={email}
                    onChange={(e) => handleOnChange("email", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[72%]"
                />
            </div>
            <div className="flex items-center gap-x-2 justify-between">
                <Label htmlFor="create-user-password" className="text-md">
                    Password
                </Label>
                <Input
                    id="create-user-password"
                    required
                    autoComplete="none"
                    value={password}
                    onChange={(e) => handleOnChange("password", e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[72%]"
                />
            </div>
            <FlatButton onClick={handleCreateUser}>
                {isLoading && (
                    <Loader2 className="animate-spin mr-2" size={28} />
                )}
                Create
            </FlatButton>
        </div>
    )
}
