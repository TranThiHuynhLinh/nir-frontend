import { envConfig } from "@/utils/configs"
import axios from "axios"
import Cookies from "js-cookie"

export const createSpectra = async (name: string, data: any) => {
    const token = Cookies.get("accessToken") || ""
    try {
        const url = `${envConfig.CLIENT_API_URL}/spectra/upload`
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        const spectra = {
            name,
            data,
        }
        const response = await axios.post(url, spectra, { headers })
        return response
    } catch (error) {
        throw error
    }
}

export const getAllSpectra = async () => {
    const token = Cookies.get("accessToken") || ""
    try {
        const url = `${envConfig.CLIENT_API_URL}/spectra`
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        const response: ISpectraRes[] = (await axios.get(url, { headers })).data
        return response
    } catch (error) {
        throw error
    }
}
