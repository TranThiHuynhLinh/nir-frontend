import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { DetailTrainingAnalystSpectraModal } from "@/components/modals/detail-training-analyst-spectra"

export const AdminAnalystSpectraColumns: ColumnDef<IProcessedData>[] = [
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
        accessorKey: "cow_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Cow id
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fat",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Fat
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "prot",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Prot
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lact",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Lact
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "scc",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Scc
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "urea",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="gap-x-2"
                >
                    Urea
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DetailTrainingAnalystSpectraModal
                    trainingSpectra={row.original}
                />
            )
        },
    },
]
