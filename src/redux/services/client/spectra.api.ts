import { IUserSpectraSendBody } from "@/app/schema/spectra.validate"
import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"
import { createApi } from "@reduxjs/toolkit/query/react"

export const userSpectraApi = createApi({
    reducerPath: "userSpectraApi",
    baseQuery: baseQueryAccess,
    tagTypes: ["spectra"],
    endpoints: (builder) => ({
        getAllSpectra: builder.query<ISpectraRes[], void>({
            query: () => ({
                url: "/client/spectra/all",
                method: "GET",
            }),
            providesTags: ["spectra"],
        }),
        getDetailUserSpectra: builder.query<ISpectraRes, string>({
            query: (id) => ({
                url: "/client/spectra/detail/" + id,
                method: "GET",
            }),
        }),
        getAnalystUserSpectra: builder.query<ISpectraRes, string>({
            query: (id) => ({
                url: "/client/spectra/analyst/" + id,
                method: "GET",
            }),
        }),
        createUserSpectra: builder.mutation<{ message: string }, IUserSpectraSendBody>({
            query: (data) => ({
                url: "/client/spectra/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["spectra"],
        }),
        deleteUserSpectras: builder.mutation<{ message: string }, string[]>({
            query: (ids) => ({
                url: "/client/spectra",
                method: "DELETE",
                body: { spectraIds: ids },
            }),
            invalidatesTags: ["spectra"],
        }),
    }),
})

export const {
    useGetAllSpectraQuery,
    useCreateUserSpectraMutation,
    useDeleteUserSpectrasMutation,
    useGetDetailUserSpectraQuery,
    useGetAnalystUserSpectraQuery,
} = userSpectraApi
