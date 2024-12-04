import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { useUnblockUserMutation } from "@/redux/services/admin/user.api"
import { toast } from "sonner"

export const AdminBlocklistColumns: ColumnDef<IUserRes>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        header: "Id",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="gap-x-2"
                >
                    Email
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="gap-x-2"
                >
                    Fullname
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation()

            const handleUnblockUser = async (id: string) => {
                try {
                    await unblockUser(id).unwrap()
                    toast.success("Unblocked!")
                } catch (err: any) {
                    toast.error(err.data.message || "Failed to block this user!")
                }
            }
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-light-card">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                            Copy user ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => handleUnblockUser(user.id)}
                            disabled={isUnblocking}
                        >
                            {isUnblocking && <Loader2 className="animate-spin mr-2" />}
                            Unblock
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
