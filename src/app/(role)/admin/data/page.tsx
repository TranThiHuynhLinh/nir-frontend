"use client"

import { DataTable } from "@/components/common/data-table"
import { UploadCollectionForm } from "@/components/forms/upload-collection-form"
import {
    useDeleteCollectionMutation,
    useGetAllCollectionQuery,
} from "@/redux/services/admin/data.api"
import { AdminCollectionColumns } from "@/utils/table-columns"
import React from "react"
import { toast } from "sonner"

export default function Page() {
    const {
        data: collections,
        isLoading: collectionsLoading,
        error: collectionsError,
    } = useGetAllCollectionQuery()
    const [deleteCollection, { isLoading: isDeleting }] =
        useDeleteCollectionMutation()
    const onDeleteCollection = async (ids: string[]) => {
        try {
            await deleteCollection(ids).unwrap()
            toast.success("Collection deleted!")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to delete users!")
        }
    }

    if (!collections || collectionsError) {
        return <div>Error</div>
    }
    return (
        <div className="w-full h-full flex justify-between">
            <DataTable
                data={collections}
                title="Training Collection"
                columns={AdminCollectionColumns}
                onDelete={onDeleteCollection}
                isDeleting={isDeleting}
                filterColumn="name"
                className="w-[60%] h-[460px]"
            />
            <UploadCollectionForm className="w-[38%]" />
        </div>
    )
}
