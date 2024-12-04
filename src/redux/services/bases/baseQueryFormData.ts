import { envConfig } from "@/utils/configs"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

const baseQueryFormData = fetchBaseQuery({
    baseUrl: `${envConfig.API_URL}`,
    prepareHeaders: async (headers) => {
        try {
            const token = Cookies.get("accessToken") || ""
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
        } catch (error) {
            console.error("Error fetching token: ", error)
        }
        return headers
    },
})

export default baseQueryFormData
