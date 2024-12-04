"use client"
import { ModelCard } from "@/components/card/model-card"
import { useGetAllModelQuery } from "@/redux/services/client/model.api"
import { time } from "@/utils/constants/enums"
import { getMilliseconds } from "@/utils/helpers/time"
import { IconFile3d, IconReportAnalytics } from "@tabler/icons-react"
import React from "react"

export default function Page() {
    const {
        data: models,
        isLoading: modelLoading,
        error: modelError,
    } = useGetAllModelQuery(undefined, {
        refetchOnFocus: true,
        refetchOnReconnect: true,
        pollingInterval: getMilliseconds({ value: 30, type: time.SECOND }),
        skipPollingIfUnfocused: true,
    })
    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                    <IconFile3d stroke={2} size={28} />
                    <p className="text-3xl font-medium">List models</p>{" "}
                </div>
                <div className="w-full grid grid-cols-3 grid-flow-row gap-8 mt-6">
                    {models?.map((model) => (
                        <ModelCard key={model.id} model={model} />
                    ))}
                </div>
            </div>
        </div>
    )
}
