import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"
import { createApi } from "@reduxjs/toolkit/query/react"

export const userRecordApi = createApi({
    reducerPath: "userRecordApi",
    baseQuery: baseQueryAccess,
    tagTypes: ["record"],
    endpoints: (builder) => ({
        getAllRecord: builder.query<IRecordRes[], void>({
            query: () => ({
                url: "/client/record",
                method: "GET",
            }),
            providesTags: ["record"],
        }),
    }),
})
export const { useGetAllRecordQuery } = userRecordApi
