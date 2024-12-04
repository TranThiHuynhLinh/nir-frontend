"use client"
import { AdminModelCard } from "@/components/card/admin-model-card"
import { useGetAllModelQuery } from "@/redux/services/admin/model.api"

export default function Page() {
    const {
        data: models,
        isLoading: modelsLoading,
        error: modelsError,
    } = useGetAllModelQuery()
    if (!models || modelsError) {
        return <div>Error</div>
    }
    return (
        <div>
            <p className="text-2xl font-semibold">List models</p>
            <div className="w-full grid grid-cols-3 grid-flow-row gap-8 mt-6">
                {models.map((model) => (
                    <AdminModelCard model={model} />
                ))}
            </div>
        </div>
    )
}
