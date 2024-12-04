interface ITokens {
    accessToken?: string
    refreshToken?: string
}

interface ILoginAPIData {
    email?: string
    password?: string
}

interface IGetRolesAPIRes extends IBaseAPIRes {
    role?: enums.ROLES
}
