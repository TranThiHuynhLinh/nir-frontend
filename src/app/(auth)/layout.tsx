import React from "react"

type Props = {
    children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<Props>) {
    return <div className="h-full w-full">{children}</div>
}
