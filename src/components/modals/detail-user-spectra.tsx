import { SpectraChart } from "@/components/charts/spectra-chart"
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
import { useGetDetailUserSpectraQuery } from "@/redux/services/client/spectra.api"
import { datetimeFormat } from "@/utils/constants/enums"
import { formatTime } from "@/utils/helpers/time"
import { IconCopyCheckFilled } from "@tabler/icons-react"
import { toast } from "sonner"

export const DetailUserSpectraModal = ({ spectraId }: { spectraId: string }) => {
    const {
        data: detailUserSpectra,
        isLoading: detailUserSpectraLoading,
        error: detailUserSpectraError,
    } = useGetDetailUserSpectraQuery(spectraId)
    if (!detailUserSpectra) return <p>Fail load data! Try again!</p>
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Detail</Button>
            </SheetTrigger>
            <SheetContent className="!max-w-6xl py-6 px-12">
                <SheetHeader>
                    <SheetTitle className="text-3xl font-semibold">
                        Detail of {detailUserSpectra.name}
                    </SheetTitle>
                    <SheetDescription className=" flex justify-start items-center gap-x-4 text-md text-foreground/60">
                        Created at:{" "}
                        {formatTime({
                            init: detailUserSpectra.createdAt,
                            type: datetimeFormat.YYYY_MM_DD__HH_MM,
                        })}
                        <span className="ml-12 font-medium">Id: {detailUserSpectra.id}</span>
                        <FlatButton
                            size={"icon"}
                            onClick={() => {
                                navigator.clipboard.writeText(detailUserSpectra.id)
                                toast.success("Copied Collection Id!")
                            }}
                        >
                            <IconCopyCheckFilled size={20} />
                        </FlatButton>
                    </SheetDescription>
                </SheetHeader>
                <div className="">
                    <div className="flex flex-col my-4 justify-start w-full gap-y-2 text-lg font-medium text-foreground">
                        <div className="flex gap-x-4">
                            <p>Description:</p>
                            <p> {detailUserSpectra.description}</p>
                        </div>
                    </div>
                    <SpectraChart spectra={detailUserSpectra} className="pt-4 h-[36%] w-[60%]" />
                </div>
            </SheetContent>
        </Sheet>
    )
}
