"use client"
import { MultipleBarChart } from "@/components/charts/multiple-bar-chart"
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
import { AdminAnalystSpectraColumns } from "@/utils/table-columns/admin/analyst-spectra"
import { IconCopyCheckFilled } from "@tabler/icons-react"
import { Loader2, MoveLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Page({ params }: { params: { id: string } }) {
    const [processedData, setProcessedData] = useState<IProcessedData[]>([])
    const [chemicalData, setChemicalData] = useState<IDataMultipleBarChart[]>(
        []
    )
    const [milkYieldData, setMilkYieldData] = useState<IDataMultipleBarChart[]>(
        []
    )
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
        if (collection?.name) {
            setNewName(collection.name)
        }
    }, [collection])

    useEffect(() => {
        const data: IProcessedData[] =
            collection?.TrainingSpectra.map((item) => {
                let attributes: Partial<IDataAttributes> = {}
                let parsedDataArray: IDataItem[] = []
                try {
                    parsedDataArray = JSON.parse(item.data.toString())
                    if (parsedDataArray.length > 0) {
                        attributes = parsedDataArray[0].attributes
                    }
                } catch (error) {
                    console.error("Error parsing data:", error)
                }

                const parsedData =
                    parsedDataArray.length > 0 ? parsedDataArray[0].data : []

                return {
                    ...item,
                    name: item.name,
                    data: parsedData,
                    ...attributes,
                    collectionId: item.id,
                }
            }) || []
        setProcessedData(data)
    }, [collection?.TrainingSpectra])
    useEffect(() => {
        if (collectionAnalyst?.attributesStats) {
            const convertedData = convertAttributesToDataMultipleBarChart({
                attributes: collectionAnalyst.attributesStats,
                type: "chemical",
            })
            const convertedMilkData = convertAttributesToDataMultipleBarChart({
                attributes: collectionAnalyst.attributesStats,
                type: "milk",
            })
            setMilkYieldData(convertedMilkData)
            setChemicalData(convertedData)
        }
    }, [collectionAnalyst?.attributesStats])
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
            type: "analyst",
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
                            id={`id-${collection?.name}`}
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
                    <MultipleBarChart
                        data={chemicalData}
                        title="Chemical analyst"
                        className="w-[48%]"
                    />
                    <div className="flex flex-col justify-between">
                        <div className={`flex gap-x-6 justify-between`}>
                            <div className="flex flex-col gap-y-4 px-6 py-4 bg-secondary/10 rounded-xl max-h-[148px] shadow-lg">
                                <div className="text-2xl font-normal text-foreground/60">
                                    Total spectras
                                </div>
                                <div className="text-5xl font-semibold">
                                    {collectionAnalyst.totalSpectras}
                                    <span className="text-xl text-foreground/60 font-medium ml-2">
                                        records
                                    </span>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex flex-col gap-y-4 px-6 py-4 bg-secondary/10 rounded-xl max-h-[148px] shadow-lg">
                                    <div className="text-2xl font-normal text-foreground/60">
                                        Total cows
                                    </div>
                                    <div className="text-5xl font-semibold">
                                        {countUniqueCowIds(processedData)}
                                        <span className="text-xl text-foreground/60 font-medium ml-2">
                                            cows
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex flex-col gap-y-4 px-6 py-4 bg-secondary/10 rounded-xl max-h-[148px] shadow-lg">
                                    <div className="text-2xl font-normal text-foreground/60">
                                        Milk Yield
                                    </div>
                                    <div className="text-5xl font-semibold">
                                        {sumMilkYield(processedData)}{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <MultipleBarChart
                            data={milkYieldData}
                            title="Milk Yield"
                            className="w-[58%]"
                        />
                    </div>
                </div>
                <div className="mt-12">
                    <DataTable
                        data={processedData}
                        title="Analyst Spectra Detail"
                        columns={AdminAnalystSpectraColumns}
                        filterColumn="id"
                        className="w-[90%]"
                        onDelete={onDeleteTrainingSpectra}
                    />
                </div>
            </div>
        </div>
    )
}

function convertAttributesToDataMultipleBarChart({
    attributes,
    type,
}: {
    attributes: IDataAnalystAttributes
    type: string
}): IDataMultipleBarChart[] {
    if (type === "chemical") {
        return Object.entries(attributes)
            .filter(([key]) =>
                ["fat", "prot", "lact", "scc", "urea"].includes(key)
            )
            .map(([name, stats]) => ({
                name,
                min: Number(stats.min),
                max: Number(stats.max),
                mean: Number(stats.mean),
                median: Number(stats.median),
            }))
    } else if (type === "milk") {
        return Object.entries(attributes)
            .filter(([key]) => ["milkYield"].includes(key))
            .map(([name, stats]) => ({
                name,
                min: Number(stats.min),
                max: Number(stats.max),
                mean: Number(stats.mean),
                median: Number(stats.median),
            }))
    } else {
        return []
    }
}
function countUniqueCowIds(data: IProcessedData[]): number {
    const uniqueCowIds = new Set<string>()
    data.forEach((item) => {
        if (item.cow_id) {
            uniqueCowIds.add(item.cow_id)
        }
    })
    return uniqueCowIds.size
}
function sumMilkYield(data: IProcessedData[]): number {
    const totalMilkYield = data.reduce((total, item) => {
        if (item.milkYield) {
            return total + Number(item.milkYield)
        }
        return total
    }, 0)
    return Math.round(totalMilkYield)
}
