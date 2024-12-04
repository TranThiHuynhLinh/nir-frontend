import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"
import { createApi } from "@reduxjs/toolkit/query/react"

export const userModelApi = createApi({
    reducerPath: "userModelApi",
    baseQuery: baseQueryAccess,
    tagTypes: ["model"],
    endpoints: (builder) => ({
        getAllModel: builder.query<IModelRes[], void>({
            query: () => ({
                url: "/client/model/all",
                method: "GET",
            }),
            providesTags: ["model"],
        }),
    }),
})

export const { useGetAllModelQuery } = userModelApi
