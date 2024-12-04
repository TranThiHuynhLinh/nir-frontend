import { regex } from "@/utils/constants"

export const isEmpty = (value: string) => {
    return !value
}

export const isEmail = (value: string) => {
    return regex.RULE.EMAIL.test(value)
}

export const isNumber = (value: string) => {
    return regex.RULE.NUMBER.test(value)
}
