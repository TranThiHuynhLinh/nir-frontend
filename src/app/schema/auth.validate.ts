export interface RegisterBody {
    fullname: string
    email: string
    password: string
    confirm: string
}

export interface RegisterSendBody {
    fullname: string
    email: string
    password: string
}

export interface RegisterValidationResponse {
    fullname: string
    email: string
    invalid: string
    password: string
    passwordLength: string
    confirm: string
    match: string
}

export const registerValidation = (data: RegisterBody) => {
    if (!data.fullname) return "Fullname is required"

    if (!data.email) return "Email is required"
    if (!data.email.includes("@")) return "Invalid email"

    if (!data.password) return "Password is required"
    if (data.password.length < 6)
        return "Password must be at least 6 characters"

    if (!data.confirm) return "Confirm password is required"
    if (data.password !== data.confirm) return "Password does not match"
}

export interface LoginSendBody {
    email: string
    password: string
}

export interface LoginValidationResponse {
    email: string
    invalid: string
    password: string
    passwordLength: string
}

export const loginValidation = (data: LoginSendBody) => {
    if (!data.email) return "Email is required"
    if (!data.email.includes("@")) return "Invalid email"
    if (!data.password) return "Password is required"
    if (data.password.length < 6)
        return "Password must be at least 6 characters"
}
