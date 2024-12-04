"use client"

import { SimpleBarChart } from "@/components/charts/bar-chart"
import { DataTable } from "@/components/common/data-table"
import { FlatButton } from "@/components/common/flat-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    useChangeNameCollectionMutation,
    useDeleteTrainingSpectraMutation,
    useGetAnalystCollectionQuery,
    useGetDetailCollectionQuery,
} from "@/redux/services/admin/data.api"
import { AdminClassifySpectraColumns } from "@/utils/table-columns"
import { IconCopyCheckFilled } from "@tabler/icons-react"
import { Loader2, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Page({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    const {
        data: collectionAnalyst,
        isLoading: getCollectionAnalystLoading,
        error: getCollectionAnalystError,
    } = useGetAnalystCollectionQuery(id)

    const {
        data: collection,
        isLoading: getCollectionLoading,
        error: getCollectionError,
    } = useGetDetailCollectionQuery(id)

    const [changeName, { isLoading: changingName }] =
        useChangeNameCollectionMutation()
    const [newName, setNewName] = useState<string | undefined>(undefined)

    const [deleteTrainingSpectra, { isLoading: isDeleting }] =
        useDeleteTrainingSpectraMutation()

    useEffect(() => {
        if (collectionAnalyst?.name) {
            setNewName(collectionAnalyst.name)
        }
    }, [collectionAnalyst])

    const handleChangeName = async () => {
        if (!newName || newName === collectionAnalyst?.name) return
        try {
            await changeName({ newName, collectionId: params.id }).unwrap()
            toast.success("Changed!")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to change name!")
            setNewName(collectionAnalyst?.name)
        }
    }

    const onDeleteTrainingSpectra = async (ids: number[] | string[]) => {
        const formattedIds = ids.map((id) => Number(id))
        const deletePayload: ITrainingSpectraDelete = {
            ids: formattedIds,
            type: "classify",
        }
        try {
            await deleteTrainingSpectra(deletePayload).unwrap()
            toast.success("Training Spectra in this collection deleted!")
        } catch (err: any) {
            toast.error(
                err.data.message || "Failed to delete training Spectra!"
            )
        }
    }

    if (!collectionAnalyst || !collection) return <div>Error...</div>

    return (
        <div>
            <Link
                href="/admin/data"
                className="text-lg font-medium mb-4 flex gap-x-2 text-primary cursor-pointer"
            >
                <MoveLeft />
                Turn back
            </Link>
            <div>
                <div className="text-3xl font-semibold">
                    Edit this collection
                </div>
                <div className="font-medium text-foreground/80 flex justify-start items-center gap-x-4">
                    Created at: {collectionAnalyst.createdAt}{" "}
                    <span className="ml-8">Id: {params.id}</span>
                    <FlatButton
                        size={"icon"}
                        onClick={() => {
                            navigator.clipboard.writeText(params.id)
                            toast.success("Copied Collection Id!")
                        }}
                    >
                        <IconCopyCheckFilled size={20} />
                    </FlatButton>
                </div>
            </div>
            <div className="">
                <div className="flex my-8 justify-start w-full gap-x-4">
                    <div className="w-[50%] gap-x-5 flex items-center">
                        <Label
                            htmlFor={`id-${collectionAnalyst?.name}`}
                            className="text-right"
                        >
                            Name
                        </Label>
                        <Input
                            id={`id-${collectionAnalyst?.name}`}
                            value={newName || ""}
                            onChange={(e) => setNewName(e.target.value)}
                            className="col-span-3"
                        />
                        <FlatButton onClick={handleChangeName}>
                            {changingName && (
                                <Loader2 className="animate-spin mr-2" />
                            )}
                            Save
                        </FlatButton>
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <SimpleBarChart
                        data={collectionAnalyst.density ?? []}
                        title="Classify Density Bar Chart"
                        x="name"
                        y="density"
                        className="w-[50%] h-[30%]"
                    />
                    <div
                        className={`flex flex-col gap-y-4 px-6 py-4 bg-light-card rounded-xl shadow-lg max-h-[160px] font-semibold`}
                    >
                        <div className="text-2xl text-foreground/60">
                            Total spectra
                        </div>
                        <div className="text-6xl">
                            {collectionAnalyst.totalSpectras}
                            <span className="text-xl text-foreground/60 font-medium ml-2">
                                records
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <DataTable
                        data={collection.TrainingSpectra}
                        title="Classification Spectra Detail"
                        columns={AdminClassifySpectraColumns}
                        filterColumn="name"
                        className="w-[80%]"
                        onDelete={onDeleteTrainingSpectra}
                    />
                </div>
            </div>
        </div>
    )
}
