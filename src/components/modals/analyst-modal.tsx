"use client"
import { runModel } from "@/api/model.api"
import { SpectraChart } from "@/components/charts/spectra-chart"
import { FlatButton } from "@/components/common/flat-button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useGetAllRecordQuery } from "@/redux/services/client/record.api"
import {
    useDeleteUserSpectrasMutation,
    useGetAllSpectraQuery,
} from "@/redux/services/client/spectra.api"
import { datetimeFormat } from "@/utils/constants/enums"
import { formatTime } from "@/utils/helpers/time"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const RunAnalystModelModal = ({ model }: { model: IModelRes }) => {
    const [selectedSpectra, setSelectedSpectra] = useState<
        ISpectraRes | undefined
    >()
    const [isLoading, setIsLoading] = useState(false)
    const [isChemicalMatch, setIsChemicalMatch] = useState<boolean>(false)
    const [result, setResult] = useState<IResultRecord | undefined>()
    const {
        data: spectras,
        isLoading: spectrasLoading,
        error: spectrasError,
    } = useGetAllSpectraQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })
    const {
        data: records,
        isLoading: recordsLoading,
        error: recordsError,
        refetch: refetchRecords,
    } = useGetAllRecordQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    useEffect(() => {
        if (!selectedSpectra || !records) {
            setResult(undefined)
            return
        }

        const selection = records.find(
            (record) => record.clientSpectraId === Number(selectedSpectra.id)
        )
        console.log("selection: ", selection)
        if (selection) {
            const { classify, analyst, chemical } = selection
            const resultRunModel: IResultRecord = {
                ...(classify && { classify }),
                ...(analyst && { analyst }),
                ...(chemical && { chemical }),
            }
            setResult(resultRunModel)
        } else {
            setResult(undefined)
            setIsChemicalMatch(false)
        }
    }, [selectedSpectra, records])
    const onChangeSelectedSpectra = (name: string) => {
        const selected = spectras?.find((spectra) => spectra.name === name)
        if (selected && records) {
            const hasMatchingChemical = records.some(
                (record) =>
                    record.clientSpectraId === Number(selected.id) &&
                    record.chemical === model.chemical
            )
            setIsChemicalMatch(hasMatchingChemical)
        } else {
            setIsChemicalMatch(false)
        }
        setSelectedSpectra(selected)
    }
    const handleRunModel = async ({
        id,
        model,
    }: {
        id?: number
        model?: IModelRes
    }) => {
        setIsLoading(true)
        if (model && id) {
            const formData: IRunModel = {
                modelId: Number(model.id),
                type: model.type,
                spectraId: id,
                chemical: model.chemical,
            }
            try {
                const res = await runModel(formData)
                setResult(res)
            } catch (error: any) {
                toast.error(error)
            } finally {
                setIsLoading(false)
                refetchRecords()
            }
        } else {
            toast.error("Lack or model and data!")
        }
    }

    if (spectrasError) return <div>Error</div>
    if (!spectras) return <div></div>
    return (
        <div className="w-full flex justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <FlatButton className="w-2/3 rounded-xl">
                        Use model
                    </FlatButton>
                </DialogTrigger>
                <DialogContent className="w-[80%] sm:max-w-[55%] h-[80%] sm:max-h-[70%] bg-light-card flex justify-between py-8 px-8">
                    <div className="flex flex-col">
                        <p className="text-2xl font-semibold mb-2">
                            Analyst model
                        </p>
                        <Select onValueChange={onChangeSelectedSpectra}>
                            <div className="flex w-[52vh] mt-2 items-center justify-between">
                                <SelectTrigger className="w-[32vh]">
                                    <SelectValue placeholder="Select your spectra" />
                                </SelectTrigger>
                                <FlatButton
                                    disabled={isLoading || isChemicalMatch}
                                    className="items-center"
                                    onClick={() =>
                                        handleRunModel({
                                            id: Number(selectedSpectra?.id),
                                            model,
                                        })
                                    }
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    Analyst
                                </FlatButton>
                            </div>
                            <SelectContent className="max-h-60">
                                <SelectGroup>
                                    {spectras &&
                                        spectras.map((spectra) => (
                                            <SelectItem
                                                value={spectra.name}
                                                key={spectra.id}
                                            >
                                                {spectra.name}
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {selectedSpectra && (
                            <div className="flex flex-col w-[52vh] h-[44vh] bg-card/40 mt-2 rounded-lg p-4">
                                <p className="text-lg font-medium">
                                    {selectedSpectra.name}
                                </p>
                                <p className="text-md font-medium text-foreground/20 mt-2 mb-6">
                                    Create at:{" "}
                                    {formatTime({
                                        init: selectedSpectra.createdAt,
                                        type: datetimeFormat.YYYY_MM_DD,
                                    })}
                                </p>
                                <SpectraChart spectra={selectedSpectra} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col justify-center h-full w-full">
                        <div className="flex flex-col justify-center h-full w-full">
                            {result !== undefined && (
                                <ResultRunModel
                                    listRecords={records?.filter(
                                        (record) =>
                                            record.clientSpectraId ===
                                            Number(selectedSpectra?.id)
                                    )}
                                    typeAnalyst={model.chemical}
                                />
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
const ResultRunModel = ({
    typeAnalyst,
    listRecords,
}: {
    typeAnalyst?: string
    listRecords?: IRecordRes | IRecordRes[]
}) => {
    const recordsArray = Array.isArray(listRecords)
        ? listRecords
        : listRecords
        ? [listRecords]
        : []
    return (
        <div className="flex flex-col gap-x-2 justify-center text-lg font-semibold bg-accent/10 h-[40%] w-full rounded-lg py-4 px-6 text-foreground/80">
            {recordsArray.map((record, index) => (
                <div key={index} className="flex flex-col mb-1">
                    {record.classify && (
                        <div className="flex w-full">
                            <p>Result of classification is </p>
                            <p className="ml-2 text-accent/80">
                                {record.classify}
                            </p>
                        </div>
                    )}
                    {record.analyst && record.chemical && (
                        <div className="flex w-full">
                            <p>
                                Result of{" "}
                                <span className="text-accent/80">
                                    {record.chemical}
                                </span>{" "}
                                analyst is{" "}
                            </p>
                            <p className="ml-2 text-accent/80">
                                {record.analyst}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
