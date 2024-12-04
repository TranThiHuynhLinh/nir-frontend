import { HomeNavigation } from "./home-navigation"
import { LoginButton } from "../common/login-button"
import { AppLogo } from "../common/app-logo"

export const AppNavbar = () => {
    return (
        <header className="flex py-1 items-center px-14 justify-between fixed z-50 top-0 left-0 right-0 bg-background">
            <div className="flex items-center gap-x-12">
                <AppLogo />
                <HomeNavigation />
            </div>
            <div className="flex gap-x-8 items-center font-semibold">
                <LoginButton />
            </div>
        </header>
    )
}
