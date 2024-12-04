import { host } from "@/utils/constants/api"
import axios from "axios"
import Cookies from "js-cookie"

export const runModel = async (model: IRunModel) => {
    const token = Cookies.get("accessToken") || ""
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    }
    try {
        const url = `${host}/client/model/run`
        const response = (await axios.post(url, model, { headers })).data
        return response
    } catch (error) {
        return error
    }
}
