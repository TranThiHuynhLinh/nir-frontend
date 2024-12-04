"use client"

import { DetailTrainingSpectraChart } from "@/components/charts/detail-training-spectra-chart"
import { FlatButton } from "@/components/common/flat-button"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { useEditTrainingAnalystSpectraMutation } from "@/redux/services/admin/data.api"
import { IconInfoCircle } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const DetailTrainingAnalystSpectraModal = ({
    trainingSpectra,
}: {
    trainingSpectra: IProcessedData
}) => {
    const [editTrainingSpectraData, { isLoading: isEditing }] =
        useEditTrainingAnalystSpectraMutation()
    const [newData, setNewData] = useState<number[]>(
        trainingSpectra.data ? [...trainingSpectra.data] : []
    )
    const [attributes, setAttributes] = useState<IDataAttributes>({
        cow_id: trainingSpectra.cow_id || "",
        fat: trainingSpectra.fat || "",
        prot: trainingSpectra.prot || "",
        lact: trainingSpectra.lact || "",
        scc: trainingSpectra.scc || "",
        urea: trainingSpectra.urea || "",
        milkYield: trainingSpectra.milkYield || "",
        milkInterv: trainingSpectra.milkInterv || "",
        set: trainingSpectra.set || "",
    })

    const [values, setValues] = useState<number[]>([0, 511])

    useEffect(() => {
        if (trainingSpectra.data && Array.isArray(trainingSpectra.data)) {
            setNewData([...trainingSpectra.data])
            setValues([
                Math.round(trainingSpectra.data.length / 3),
                Math.round(trainingSpectra.data.length / 3 + 20),
            ])
        }
    }, [trainingSpectra])

    const handlEditData = async () => {
        const payload: ITrainingAnalystSpectraEdit = {
            id: trainingSpectra.id, // Include the ID from the provided trainingSpectra
            data: JSON.stringify([
                {
                    attributes,
                    data: newData,
                },
            ]),
        }

        try {
            await editTrainingSpectraData(payload).unwrap()
            toast.success("Data updated successfully!")
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to update data!")
            setNewData(trainingSpectra.data) // Revert to original data on error
            setAttributes({
                cow_id: trainingSpectra.cow_id || "",
                fat: trainingSpectra.fat || "",
                prot: trainingSpectra.prot || "",
                lact: trainingSpectra.lact || "",
                scc: trainingSpectra.scc || "",
                urea: trainingSpectra.urea || "",
                milkYield: trainingSpectra.milkYield || "",
                milkInterv: trainingSpectra.milkInterv || "",
                set: trainingSpectra.set || "",
            })
            setValues([0, trainingSpectra.data.length - 1])
        }
    }

    const handleAttributeChange = (
        key: keyof IDataAttributes,
        value: string
    ) => {
        setAttributes((prev) => ({
            ...prev,
            [key]: value,
        }))
    }
    const handleInputChange = (index: number, value: string) => {
        const parsedValue = Number(value)
        if (isNaN(parsedValue)) return
        setNewData((prevData) => {
            const updatedData = [...prevData]
            updatedData[index] = parsedValue
            return updatedData
        })
    }
    const [start, end] = values.length === 2 ? values : [0, newData.length - 1]
    const displayedData = newData.slice(start, end + 1)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">View</Button>
            </SheetTrigger>
            <SheetContent className="!max-w-5xl py-6 px-12 overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-3xl font-semibold">
                        Detail of Id: {trainingSpectra.id}
                    </SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                    <DetailTrainingSpectraChart
                        spectra={trainingSpectra.data}
                        className="pt-4 h-[50%] w-[80%]"
                    />
                    <p></p>
                </div>
                <div className="mt-8 flex flex-col justify-between text-foreground/80 mb-4">
                    <div className="flex justify-between">
                        <p className="text-2xl font-semibold">This Spectra:</p>
                        <div className="flex">
                            <FlatButton
                                className="w-[150px]"
                                onClick={handlEditData}
                                disabled={isEditing}
                            >
                                {isEditing && (
                                    <Loader2 className="animate-spin mr-2" />
                                )}
                                Update Data
                            </FlatButton>
                        </div>
                    </div>
                    <div className="mt-2 flex gap-x-2 text-foreground/20 text-md font-semibold">
                        <IconInfoCircle stroke={2} />
                        <p>
                            Select the sample order range of the data that you
                            want to modify.
                        </p>
                    </div>
                    <div className="flex flex-col px-4">
                        <div className="mt-8">
                            <h3 className="text-xl font-medium mb-4">
                                Editable Attributes
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {Object.entries(attributes).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex flex-col"
                                        >
                                            <label
                                                htmlFor={key}
                                                className="text-sm mb-1 capitalize"
                                            >
                                                {key}
                                            </label>
                                            <input
                                                id={key}
                                                type="text"
                                                value={value}
                                                onChange={(e) =>
                                                    handleAttributeChange(
                                                        key as keyof IDataAttributes,
                                                        e.target.value
                                                    )
                                                }
                                                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-xl font-medium mb-4">
                                Data Sample of this Spectra:
                            </p>
                            <div className="flex justify-between mb-2 font-bold">
                                <span>{start}</span>
                                <span>{end}</span>
                            </div>
                            <Slider
                                value={values}
                                onValueChange={(val) => {
                                    if (val.length === 2) {
                                        setValues(val)
                                    }
                                }}
                                min={0}
                                max={newData.length - 1}
                                step={1}
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-6 gap-4">
                            {displayedData.map((value, idx) => {
                                const index = start + idx
                                return (
                                    <div key={index} className="flex flex-col">
                                        <label
                                            htmlFor={`data-${index}`}
                                            className="text-sm mb-1"
                                        >
                                            Index {index}
                                        </label>
                                        <input
                                            id={`data-${index}`}
                                            type="number"
                                            value={value}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
