import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react"
import Cookies from "js-cookie"
import { enums } from "@/utils/constants"
import { apiHelper } from "@/utils/helpers"
import { envConfig } from "@/utils/configs"
import { toast } from "sonner"
import { usePathname } from "next/navigation"
import axios from "axios"

interface AuthContextType {
    isLoggedIn: boolean | null
    loginContext: (data: ILoginAPIData) => Promise<enums.ROLES>
    logoutContext: () => Promise<void>
    role: enums.ROLES
    accessToken: string
    isAuthenticating: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
    const [role, setRole] = useState<enums.ROLES>(enums.ROLES.CLIENT)
    const [accessToken, setAccessToken] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)

    const checkAuth = async () => {
        setIsAuthenticating(true)
        try {
            const accessToken = Cookies.get("accessToken") ?? ""
            const refreshToken = Cookies.get("refreshToken") ?? ""
            if (!refreshToken) {
                logoutContext()
            } else if (!accessToken) {
                try {
                    const res = await apiHelper.auth.refresh(refreshToken)
                    if (res.data.accessToken) {
                        Cookies.set("accessToken", res.data.accessToken, {
                            path: "/",
                            expires: envConfig.ACCESS_TOKEN_EXPIRES,
                        })
                        setAccessToken(res.data.accessToken)
                    }
                    window.location.reload()
                } catch (err) {
                    logoutContext()
                    throw err
                }
            } else {
                try {
                    const res = await apiHelper.auth.getRoles(accessToken)
                    setRole(res.data.role)
                    setIsLoggedIn(true)
                } catch (err) {
                    if (err instanceof Error) {
                        try {
                            const res = await apiHelper.auth.refresh(
                                refreshToken
                            )
                            if (res.data.accessToken) {
                                Cookies.set(
                                    "accessToken",
                                    res.data.accessToken,
                                    {
                                        path: "/",
                                        expires: envConfig.ACCESS_TOKEN_EXPIRES,
                                    }
                                )
                                setAccessToken(res.data.accessToken)
                            }
                            window.location.reload()
                        } catch (err) {
                            logoutContext()
                            throw err
                        }
                    }
                }
            }
        } catch (err) {
            logoutContext()
        } finally {
            setIsAuthenticating(false)
        }
    }

    const loginContext = async (data: ILoginAPIData): Promise<any> => {
        setIsAuthenticating(true)
        try {
            const res = await apiHelper.auth.login(data)
            if (res.status === 201) {
                const accessToken = res.data.tokens.accessToken || ""
                const refreshToken = res.data.tokens.refreshToken || ""
                const userRole = res.data.role || enums.ROLES.CLIENT

                setAccessToken(accessToken)
                setRole(userRole)

                Cookies.set("accessToken", accessToken, {
                    path: "/",
                    expires: envConfig.ACCESS_TOKEN_EXPIRES,
                })
                Cookies.set("refreshToken", refreshToken, {
                    path: "/",
                    expires: envConfig.REFRESH_TOKEN_EXPIRES,
                })
                Cookies.set("role", userRole, {
                    path: "/",
                    expires: envConfig.ACCESS_TOKEN_EXPIRES,
                })
                setIsLoggedIn(true)
                return userRole
            } else {
                toast.error("Login failed. Please check your credentials.")
                throw new Error("Login failed")
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data?.message ??
                        "Login failed. Please try again."
                )
            } else if (err instanceof Error) {
                toast.error(err.message ?? "Login failed. Please try again.")
            } else {
                toast.error("An unexpected error occurred. Please try again.")
            }
            throw err
        } finally {
            setIsAuthenticating(false)
        }
    }

    const logoutContext = async () => {
        try {
            const token = Cookies.get("refreshToken") ?? ""
            await apiHelper.auth.logout(token)
        } catch (err) {
            console.log("Fail to logout! Remove local token!")
        } finally {
            Cookies.remove("refreshToken")
            Cookies.remove("accessToken")
            Cookies.remove("role")
            setIsLoggedIn(false)
            setAccessToken("")
            setRole(enums.ROLES.CLIENT)
        }
    }

    useEffect(() => {
        setAccessToken(Cookies.get("accessToken") ?? "")
        checkAuth()
    }, [pathname])

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                loginContext,
                logoutContext,
                role,
                accessToken,
                isAuthenticating,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
