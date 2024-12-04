"use client"

import React, { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar"
import {
    IconAugmentedReality,
    IconDatabase,
    IconLogout2,
    IconUserBolt,
} from "@tabler/icons-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { logOut } from "@/api/auth.api"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/providers/auth-provider"

export const AdminSidebar = ({ className }: { className?: string }) => {
    const links = [
        {
            label: "Users",
            href: "/admin/user",
            icon: (
                <IconUserBolt className="text-foreground h-7 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Data",
            href: "/admin/data",
            icon: (
                <IconDatabase className="text-foreground h-7 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Models",
            href: "/admin/model",
            icon: (
                <IconAugmentedReality className="text-foreground h-7 w-6 flex-shrink-0" />
            ),
        },
    ]
    const [open, setOpen] = useState(true)
    return (
        <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className={`justify-between gap-10 ${className}`}>
                <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {open ? <Logo /> : <LogoIcon />}
                    <div className="mt-8 flex flex-col">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                        <LogoutButton />
                    </div>
                </div>
            </SidebarBody>
        </Sidebar>
    )
}

export const LogoutButton = () => {
    const { logoutContext } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const { open } = useSidebar()
    const router = useRouter()

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            logoutContext()
            router.push("/")
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }
    return (
        <Button
            className="flex items-center justify-start group/sidebar gap-x-3 relative px-3 h-[52px] bg-card hover:bg-card"
            onClick={handleLogout}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="text-foreground h-7 w-6 animate-spin" />
            ) : (
                <IconLogout2 className="text-foreground h-7 w-6 flex-shrink-0" />
            )}
            {open && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-foreground text-lg font-medium group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                >
                    Logout
                </motion.span>
            )}
        </Button>
    )
}

export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex py-1 space-x-2 items-center text-xl relative z-20 px-4 group"
        >
            <div className="h-5 w-6 bg-accent rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-semibold text-foreground whitespace-pre group-hover:text-accent transition-colors"
            >
                NIR
            </motion.span>
        </Link>
    )
}

export const LogoIcon = () => {
    return (
        <Link
            href="/"
            className="font-normal py-2 flex space-x-2 items-center text-xl relative z-20 px-4"
        >
            <div className="h-5 w-6 bg-accent rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    )
}
