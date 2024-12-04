"use client"
import { IconUserEdit } from "@tabler/icons-react"
import React, { useEffect, useState } from "react"

export default function Page() {
    const [email, setEmail] = useState<string>("")
    const [fullname, setFullname] = useState<string>("")
    useEffect(() => {
        const storedProfile = localStorage.getItem("USER_INFO")
        if (storedProfile) {
            const profile = JSON.parse(storedProfile)
            setEmail(profile.email)
            setFullname(profile.fullname)
        }
    }, [])
    return (
        <div className="flex relative">
            <p className="absolute flex gap-x-4 text-4xl font-medium items-center">
                <IconUserEdit stroke={2} size={42} />
                Your Profile
            </p>
            <div className="flex flex-col bg-light-card h-[520px] w-1/3 mt-16 rounded-lg p-4">
                <div className="flex justify-center">
                    <img
                        src="/image/profile.png"
                        alt="profile"
                        className="h-52 w-52"
                    />
                </div>
                <p className="flex justify-center font-medium text-2xl mb-2">
                    {fullname}
                </p>
                <p className="flex justify-center font-medium text-xl text-foreground/60">
                    {email}
                </p>
            </div>
        </div>
    )
}
