"use client"

import { QuantityChart } from "@/components/charts/quantity-chart"
import { DataTable } from "@/components/common/data-table"
import { CreateUserForm } from "@/components/forms/create-user-form"
import {
    useDeleteUsersMutation,
    useFetchAllUsersQuery,
    useFetchBlocklistUsersQuery,
} from "@/redux/services/admin/user.api"
import { time } from "@/utils/constants/enums"
import { getMilliseconds } from "@/utils/helpers/time"
import { AdminBlocklistColumns, AdminUserColumns } from "@/utils/table-columns"

import { toast } from "sonner"

export default function Page() {
    const {
        data: users,
        error: fetchAllUsersError,
        isLoading: isFetchingUsers,
    } = useFetchAllUsersQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: getMilliseconds({ value: 30, type: time.SECOND }),
        skipPollingIfUnfocused: true,
    })
    const {
        data: blacklist,
        error: fetchBlacklistError,
        isLoading: isFetchingBlacklist,
    } = useFetchBlocklistUsersQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: getMilliseconds({ value: 5, type: time.MINUTE }),
        skipPollingIfUnfocused: true,
    })

    const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation()
    const onDeleteUsers = async (ids: string[]) => {
        try {
            await deleteUsers(ids).unwrap()
            toast.success("Users deleted!")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to delete users!")
        }
    }

    if (isFetchingUsers) return <div>Loading...</div>
    if (!users) return <div>Error...</div>

    return (
        <div className="grid grid-cols-12 h-full w-full">
            <div className="col-span-8 flex flex-col gap-y-8 mb-12">
                <DataTable
                    title="All active accounts"
                    columns={AdminUserColumns}
                    filterColumn="email"
                    data={users}
                    onDelete={onDeleteUsers}
                    isDeleting={isDeleting}
                />
                {blacklist && (
                    <DataTable
                        title="All blocked accounts"
                        titleClassname="text-red-500"
                        columns={AdminBlocklistColumns}
                        filterColumn="email"
                        data={blacklist}
                        onDelete={onDeleteUsers}
                        isDeleting={isDeleting}
                    />
                )}
            </div>
            <div className="ml-12 col-span-4">
                <QuantityChart
                    value={32}
                    title="Total Accounts"
                    subtitle="This is the number including blocked accounts"
                    className="mb-8"
                />
                <CreateUserForm />
            </div>
        </div>
    )
}
