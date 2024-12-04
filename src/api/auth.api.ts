import axios from "axios"
import { LoginSendBody, RegisterSendBody } from "@/app/schema/auth.validate"
import { host } from "@/utils/constants/api"
import Cookies from "js-cookie"

export const register = async (body: RegisterSendBody) => {
    try {
        const url = `${host}/auth/register`
        const response = await axios.post(url, body)
        return response
    } catch (error: any) {
        return error
    }
}

export const logIn = async (body: LoginSendBody) => {
    try {
        const url = `${host}/auth/login`
        const response = await axios.post(url, body)
        return response
    } catch (error: any) {
        return error
    }
}

export const logOut = async () => {
    const token = Cookies.get("refreshToken") || ""
    if (token) {
        try {
            const url = `${host}/auth/logout`
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
            const response = await axios.delete(url, { headers })
            return response
        } catch (error: any) {
            return error
        }
    }
}
