"use client"

import { IconBrandInertia } from "@tabler/icons-react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"
import { enums } from "@/utils/constants"

export const LoginButton = () => {
    const { isLoggedIn, role, isAuthenticating } = useAuth()

    if (isAuthenticating) {
        return (
            <div className="flex items-center gap-x-2 bg-primary/20 text-primary px-4 py-2 rounded-2xl hover:bg-primary/30">
                <Loader2 size={24} className="animate-spin mr-2" />
                Loading
            </div>
        )
    }

    return (
        <>
            {isLoggedIn ? (
                <Link
                    href={`/${
                        role === enums.ROLES.ADMIN ? "admin/user" : "client"
                    }`}
                    className="flex items-center gap-x-2 bg-primary/20 text-primary px-4 py-1 rounded-2xl hover:bg-primary/30"
                >
                    <IconBrandInertia size={32} />
                    Go to your workspace
                </Link>
            ) : (
                <Link
                    href={"/login"}
                    className="flex items-center gap-x-2 bg-primary/20 text-primary px-4 py-1 rounded-2xl hover:bg-primary/30"
                >
                    <IconBrandInertia size={32} />
                    Login
                </Link>
            )}
        </>
    )
}
