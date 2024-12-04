import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { formatTime } from "@/utils/helpers/time"
import { datetimeFormat } from "@/utils/constants/enums"
import { Checkbox } from "@/components/ui/checkbox"

export const ClientRecordColumns: ColumnDef<IRecordRes>[] = [
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
        accessorKey: "clientSpectraId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Spectra Id
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "classify",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Result classify
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "analyst",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Result Analyst
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "chemical",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Chemical classify
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
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
            return
        },
    },
]
