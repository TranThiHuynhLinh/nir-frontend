import baseQueryFormData from "@/redux/services/bases/baseQueryFormData"
import { createApi } from "@reduxjs/toolkit/query/react"

export const adminDataApi = createApi({
    reducerPath: "adminDataApi",
    baseQuery: baseQueryFormData,
    tagTypes: ["collection", "trainingSpectra", "analyst"],
    endpoints: (builder) => ({
        getAllCollection: builder.query<ICollectionRes[], void>({
            query: () => ({
                url: "/admin/collection/all",
                method: "GET",
            }),
            providesTags: ["collection"],
        }),
        getDetailCollection: builder.query<ICollectionDetailRes, number>({
            query: (id) => ({
                url: "/admin/collection/detail/" + id,
                method: "GET",
            }),
            providesTags: ["trainingSpectra"],
        }),
        getAnalystCollection: builder.query<ICollectionAnalystRes, number>({
            query: (id) => ({
                url: "/admin/collection/analyst/" + id,
                method: "GET",
            }),
            providesTags: ["analyst"],
        }),
        deleteTrainingSpectra: builder.mutation<void, ITrainingSpectraDelete>({
            query: (body) => ({
                url: "/admin/collection/delete/spectra/" + body.type,
                method: "DELETE",
                body: { spectraIds: body.ids },
            }),
            invalidatesTags: ["collection", "trainingSpectra", "analyst"],
        }),
        editTrainingClassifySpectra: builder.mutation<
            void,
            ITrainingClassifySpectraEdit
        >({
            query: (body) => ({
                url: "/admin/collection/edit/classify-spectra/" + body.id,
                method: "PATCH",
                body: { data: body.data },
            }),
            invalidatesTags: ["collection", "trainingSpectra"],
        }),
        editTrainingAnalystSpectra: builder.mutation<
            void,
            ITrainingAnalystSpectraEdit
        >({
            query: (body) => ({
                url: "/admin/collection/edit/analyst-spectra/" + body.id,
                method: "PATCH",
                body: { data: body.data },
            }),
            invalidatesTags: ["collection", "trainingSpectra"],
        }),
        uploadCollection: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/admin/collection/create",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["collection"],
        }),
        deleteCollection: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: "/admin/collection",
                method: "DELETE",
                body: { data: ids },
            }),
            invalidatesTags: ["collection"],
        }),
        changeNameCollection: builder.mutation<void, ICollectionChange>({
            query: (data) => ({
                url: "/admin/collection/rename",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["collection"],
        }),
    }),
})

export const {
    useGetAllCollectionQuery,
    useGetDetailCollectionQuery,
    useDeleteTrainingSpectraMutation,
    useEditTrainingClassifySpectraMutation,
    useEditTrainingAnalystSpectraMutation,
    useGetAnalystCollectionQuery,
    useUploadCollectionMutation,
    useDeleteCollectionMutation,
    useChangeNameCollectionMutation,
} = adminDataApi
