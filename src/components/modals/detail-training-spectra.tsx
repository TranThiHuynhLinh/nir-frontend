"use client"

import { DetailTrainingSpectraChart } from "@/components/charts/detail-training-spectra-chart"
import { FlatButton } from "@/components/common/flat-button"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { useEditTrainingClassifySpectraMutation } from "@/redux/services/admin/data.api"
import { IconInfoCircle } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const DetailTrainingSpectraModal = ({
    trainingSpectra,
}: {
    trainingSpectra: ITrainingSpectra
}) => {
    const [editTrainingSpectraData, { isLoading: isEditing }] =
        useEditTrainingClassifySpectraMutation()
    const [newData, setNewData] = useState<number[]>(
        trainingSpectra.data ? [...trainingSpectra.data] : []
    )
    const [values, setValues] = useState<number[]>([0, 511])

    useEffect(() => {
        if (trainingSpectra.data && Array.isArray(trainingSpectra.data)) {
            setNewData([...trainingSpectra.data])
            setValues([
                Math.round(trainingSpectra.data.length / 3),
                Math.round(trainingSpectra.data.length / 2 - 1),
            ])
        }
    }, [trainingSpectra])

    const handlEditData = async () => {
        if (
            !newData ||
            JSON.stringify(newData) === JSON.stringify(trainingSpectra.data)
        )
            return
        const editData: ITrainingClassifySpectraEdit = {
            id: trainingSpectra.id,
            data: newData,
        }
        try {
            await editTrainingSpectraData(editData).unwrap()
            toast.success("Data updated successfully!")
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to update data!")
            setNewData(trainingSpectra.data)
            setValues([0, trainingSpectra.data.length - 1])
        }
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
                    {trainingSpectra.name && (
                        <SheetDescription className="flex justify-start items-center gap-x-4 text-lg text-foreground/60 font-semibold">
                            <p className="mt-2">
                                Classify:{" "}
                                <span className="text-primary">
                                    {trainingSpectra.name}
                                </span>
                            </p>
                        </SheetDescription>
                    )}
                </SheetHeader>
                <div className="mt-8">
                    <DetailTrainingSpectraChart
                        spectra={trainingSpectra.data}
                        className="pt-4 h-[50%] w-[80%]"
                    />
                    <p></p>
                </div>
                <div className="mt-8 flex flex-col justify-between text-foreground/80 mb-4">
                    <p className="text-xl font-medium">
                        Data Sample of this Spectra:
                    </p>
                    <div className="mt-2 flex gap-x-2 text-foreground/20 text-md font-semibold">
                        <IconInfoCircle stroke={2} />
                        <p>
                            Select the sample order range of the data that you
                            want to modify.
                        </p>
                    </div>
                    <div className="mt-8">
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
                    <div className="flex justify-end mt-4">
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
            </SheetContent>
        </Sheet>
    )
}
