"use client"
import { DataTable } from "@/components/common/data-table"
import {
    CreateSpectraModal,
    CreateSpectraModalBody,
    CreateSpectraModalTrigger,
} from "@/components/modals/create-spectra"
import { useGetAllRecordQuery } from "@/redux/services/client/record.api"
import {
    useDeleteUserSpectrasMutation,
    useGetAllSpectraQuery,
} from "@/redux/services/client/spectra.api"
import { time } from "@/utils/constants/enums"
import { getMilliseconds } from "@/utils/helpers/time"
import { ClientSpectraColumns } from "@/utils/table-columns"
import { ClientRecordColumns } from "@/utils/table-columns/client/record"
import { toast } from "sonner"

export default function Page() {
    const [deleteSpectras, { isLoading: isDeleting }] =
        useDeleteUserSpectrasMutation()
    const {
        data: spectras,
        isLoading: spectrasLoading,
        error: spectrasError,
    } = useGetAllSpectraQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: getMilliseconds({ value: 30, type: time.SECOND }),
        skipPollingIfUnfocused: true,
    })

    const {
        data: records,
        isLoading: recordsLoading,
        error: recordsError,
    } = useGetAllRecordQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: getMilliseconds({ value: 30, type: time.SECOND }),
        skipPollingIfUnfocused: true,
    })

    if (spectrasError) return <div>Error</div>
    if (!spectras) return <div></div>
    if (!records) return <div></div>
    const onDeleteSpectras = async (ids: string[]) => {
        try {
            await deleteSpectras(ids).unwrap()
            toast.success("Spectras deleted!")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to delete users!")
        }
    }
    return (
        <div className="flex flex-col gap-y-4">
            <CreateSpectraModal>
                <CreateSpectraModalTrigger className="w-[220px]">
                    Upload your spectra
                </CreateSpectraModalTrigger>
                <CreateSpectraModalBody />
            </CreateSpectraModal>
            <DataTable
                data={spectras}
                title="Your spectras list"
                columns={ClientSpectraColumns}
                onDelete={onDeleteSpectras}
                isDeleting={isDeleting}
                filterColumn="name"
                className="col-span-6"
            />

            <DataTable
                data={records}
                title="Your predicted record"
                columns={ClientRecordColumns}
                onDelete={onDeleteSpectras}
                isDeleting={isDeleting}
                filterColumn="name"
                className="col-span-6"
            />
        </div>
    )
}
