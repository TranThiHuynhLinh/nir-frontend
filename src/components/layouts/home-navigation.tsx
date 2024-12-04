"use client"

export const HomeNavigation = () => {
    const scrollToId = (id: string) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="flex gap-x-10">
            <div
                className="text-foreground text-md font-semibold transition-colors hover:text-accent cursor-pointer"
                onClick={() => scrollToId("home")}
            >
                Home
            </div>
            <div
                className="text-foreground text-md font-semibold transition-colors hover:text-accent cursor-pointer"
                onClick={() => scrollToId("features")}
            >
                Features
            </div>
            <div
                className="text-foreground text-md font-semibold transition-colors hover:text-accent cursor-pointer"
                onClick={() => scrollToId("contact")}
            >
                Contact
            </div>
        </div>
    )
}
