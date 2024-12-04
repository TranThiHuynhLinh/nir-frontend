import { IconUserFilled } from "@tabler/icons-react"
import React from "react"

export const QuantityChart = ({
    value,
    title,
    subtitle,
    className,
}: {
    value: number
    title: string
    subtitle: string
    className?: string
}) => {
    return (
        <div
            className={`flex flex-col gap-y-4 px-6 py-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl shadow-lg max-h-[360px] ${className}`}
        >
            <div className="text-2xl font-semibold">{title}</div>
            <div className="flex items-center gap-x-2">
                <IconUserFilled size={42} />
                <div className="text-6xl font-medium">{value}</div>
            </div>
            <div className="text-sm text-foreground/80 font-semibold">
                {subtitle}
            </div>
        </div>
    )
}
