import { RunAnalystModelModal } from "@/components/modals/analyst-modal"
import { RunClassifyModelModal } from "@/components/modals/classify-modal"
import { datetimeFormat } from "@/utils/constants/enums"
import { formatTime } from "@/utils/helpers/time"
import { IconBoxModel } from "@tabler/icons-react"

export const ModelCard = ({ model }: { model: IModelRes }) => {
    return (
        <div className=" flex flex-col bg-model_card/50 h-[280px] w-[54vh] rounded-xl py-4 px-6">
            <div className="flex items-center bg-secondary/20 text-secondary rounded-lg p-2 h-10 w-10">
                <IconBoxModel stroke={1} size={32} />
            </div>
            <div className="flex h-full flex-col gap-y-2 justify-center">
                <div className="flex flex-col gap-y-2">
                    <p className="text-md font-semibold text-foreground/20 items-center">
                        <span className="text-foreground/80">Create at: </span>
                        {formatTime({
                            init: model.createdAt,
                            type: datetimeFormat.YYYY_MM_DD,
                        })}
                    </p>
                    <p className="text-2xl font-semibold">{model.name}</p>
                </div>
                {model.chemical ? (
                    <div className="flex gap-2 items-center ">
                        <p className="flex items-center justify-center mt-1 rounded-sm py-2 px-3 font-semibold bg-purple-800/20 text-purple-800 text-sm">
                            {model.type}
                        </p>
                        <p className="flex items-center justify-center mt-1 rounded-sm py-2 px-3 font-semibold bg-secondary/10 text-secondary text-sm">
                            {model.chemical}
                        </p>
                    </div>
                ) : (
                    <p className="flex w-1/3 items-center justify-center mt-1 rounded-sm py-2 px-3 font-semibold bg-purple-800/20 text-purple-800 text-sm">
                        {model.type}
                    </p>
                )}
            </div>
            {model.type === "CLASSIFY" ? (
                <RunClassifyModelModal model={model} />
            ) : (
                <RunAnalystModelModal model={model} />
            )}
        </div>
    )
}
