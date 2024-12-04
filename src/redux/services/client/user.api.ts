import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"
import { createApi } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryAccess,
    endpoints: (builder) => ({
        getRoles: builder.query<IRoleRes, void>({
            query: () => ({
                url: "/auth/get-roles",
                method: "GET",
            }),
        }),
    }),
})

export const { useGetRolesQuery } = userApi
