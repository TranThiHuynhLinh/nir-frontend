"use client"

import { useEffect } from "react"
import { AdminSidebar } from "@/components/layouts/admin-sidebar"
import { useAuth } from "@/providers/auth-provider"
import { ROLES } from "@/utils/constants/enums"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticating } = useAuth()
    const route = useRouter()

    useEffect(() => {
        if (Cookies.get("role") !== ROLES.ADMIN) {
            route.push("/unauthorized")
        }
    }, [route])

    if (isAuthenticating) return <p>Loading...</p>

    return (
        <div className="h-full w-full flex flex-col md:flex-row flex-1">
            <AdminSidebar />
            <div className="flex flex-col flex-1 w-full h-full p-2 md:p-8 bg-background overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}
