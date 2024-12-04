import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"
import { createApi } from "@reduxjs/toolkit/query/react"

export const adminModelApi = createApi({
    reducerPath: "adminModelApi",
    baseQuery: baseQueryAccess,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllModel: builder.query<IModelRes[], void>({
            query: () => ({
                url: "/admin/model/all",
                method: "GET",
            }),
        }),
    }),
})

export const { useGetAllModelQuery } = adminModelApi
