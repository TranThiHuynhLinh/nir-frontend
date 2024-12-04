import { ClientSidebar } from "@/components/layouts/client-sidebar"

interface LayoutProps {
    children: React.ReactNode
}

export default function ClientLayout({ children }: LayoutProps) {
    return (
        <div className="h-full w-full flex flex-col md:flex-row flex-1">
            <ClientSidebar />
            <div className="flex flex-col flex-1 w-full h-full p-2 md:p-8 bg-background overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}
