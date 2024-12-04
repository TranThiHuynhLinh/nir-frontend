import { createApi } from "@reduxjs/toolkit/query/react"
import { RegisterSendBody } from "@/app/schema/auth.validate"
import baseQueryAccess from "@/redux/services/bases/baseQueryAccess"

export const adminUserApi = createApi({
    reducerPath: "adminUserApi",
    baseQuery: baseQueryAccess,
    tagTypes: ["user", "blocklist"],
    endpoints: (builder) => ({
        fetchAllUsers: builder.query<IUserRes[], void>({
            query: () => ({
                url: "/admin/user",
                method: "GET",
            }),
            providesTags: ["user"],
        }),
        createUser: builder.mutation<IUserRes, RegisterSendBody>({
            query: (data) => ({
                url: "/admin/user/create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["user"],
        }),
        deleteUsers: builder.mutation<void, string[]>({
            query: (ids) => ({
                url: "/admin/user/delete",
                method: "DELETE",
                body: { userIds: ids },
            }),
            invalidatesTags: ["user", "blocklist"],
        }),
        fetchBlocklistUsers: builder.query<IUserRes[], void>({
            query: () => ({
                url: "/admin/user/blocklist",
                method: "GET",
            }),
            providesTags: ["blocklist"],
        }),
        blockUser: builder.mutation<void, string>({
            query: (id) => ({
                url: "/admin/user/block/" + id,
                method: "PATCH",
            }),
            invalidatesTags: ["blocklist", "user"],
        }),
        unblockUser: builder.mutation<void, string>({
            query: (id) => ({
                url: "/admin/user/unblock/" + id,
                method: "PATCH",
            }),
            invalidatesTags: ["blocklist", "user"],
        }),
    }),
})

export const {
    useFetchAllUsersQuery,
    useCreateUserMutation,
    useDeleteUsersMutation,
    useFetchBlocklistUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
} = adminUserApi
