import { datetimeFormat } from "@/utils/constants/enums"
import { formatTime } from "@/utils/helpers/time"

export const AdminModelCard = ({ model }: { model: IModelRes }) => {
    return (
        <div className=" flex flex-col justify-between bg-light-card h-[220px] w-[50vh] rounded-xl py-4 px-6">
            <div className="flex flex-col gap-y-2">
                <div className="flex justify-between">
                    <p className="text-lg font-medium">{model.name}</p>
                    <p className="flex w-1/3 items-center justify-center mt-1 rounded-xl font-medium bg-accent/30 text-accent text-sm">
                        {model.type.toLowerCase()}
                    </p>
                </div>
                <p className="text-sm font-medium text-foreground/30">
                    Create at:{" "}
                    {formatTime({
                        init: model.createdAt,
                        type: datetimeFormat.YYYY_MM_DD,
                    })}
                </p>
            </div>
        </div>
    )
}
