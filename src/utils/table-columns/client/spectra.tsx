import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { formatTime } from "@/utils/helpers/time"
import { datetimeFormat } from "@/utils/constants/enums"
import { Checkbox } from "@/components/ui/checkbox"
import { DetailUserSpectraModal } from "@/components/modals/detail-user-spectra"

export const ClientSpectraColumns: ColumnDef<ISpectraRes>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Id
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Name
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Created At
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const createdAt = row.original.createdAt
            return formatTime({
                init: createdAt,
                type: datetimeFormat.YYYY_MM_DD__HH_MM,
            })
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <DetailUserSpectraModal spectraId={row.original.id} />
        },
    },
]
