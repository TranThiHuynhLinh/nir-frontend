import { envConfig } from "@/utils/configs"
import axios from "axios"

export const auth = {
    login: async (body: ILoginAPIData) => {
        try {
            const url = `${envConfig.API_URL}/auth/login`
            return await axios.post(url, body)
        } catch (error) {
            throw error
        }
    },
    logout: async (refreshToken: string) => {
        try {
            const url = `${envConfig.API_URL}/auth/logout`
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            }
            return await axios.delete(url, { headers })
        } catch (error) {
            throw error
        }
    },
    getRoles: async (accessToken: string) => {
        try {
            const url = `${envConfig.API_URL}/auth/get-roles`
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            }
            return await axios.get(url, { headers })
        } catch (error) {
            throw error
        }
    },
    refresh: async (refreshToken: string) => {
        try {
            const url = `${envConfig.API_URL}/auth/refresh`
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            }
            return await axios.get(url, { headers })
        } catch (error) {
            throw error
        }
    },
}
