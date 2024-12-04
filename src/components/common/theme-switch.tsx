"use client"
import { Moon, MoonStar } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export const ThemeSwitcher = ({ className }: { className?: string }) => {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted)
        return (
            <Button variant="outline" size="icon">
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    return (
        <div className={className}>
            {theme === "light" ? (
                <Button
                    variant="link"
                    size="icon"
                    className="rounded-full border"
                    onClick={() => setTheme("dark")}
                >
                    <Moon size={24} />
                </Button>
            ) : (
                <Button
                    variant="link"
                    size="icon"
                    className="rounded-full border"
                    onClick={() => setTheme("light")}
                >
                    <MoonStar size={24} />
                </Button>
            )}
        </div>
    )
}
