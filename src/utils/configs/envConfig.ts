export const envConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
    CLIENT_API_URL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/client",
    ADMIN_API_URL: process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin",
    ACCESS_TOKEN_EXPIRES: parseInt(process.env.ACCESS_TOKEN_EXPIRES || "1"),
    REFRESH_TOKEN_EXPIRES: parseInt(process.env.REFRESH_TOKEN_EXPIRES || "3"),
}
