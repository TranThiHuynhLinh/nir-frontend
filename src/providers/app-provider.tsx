"use client"
import { AuthProvider } from "./auth-provider"
import { ThemeProvider } from "./theme-provider"
import { store } from "@/redux/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"

export function AppProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <AuthProvider>
                <Provider store={store}> {children}</Provider>
            </AuthProvider>
        </ThemeProvider>
    )
}
