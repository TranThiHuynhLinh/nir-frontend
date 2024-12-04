"use client"

import {
    ColumnFiltersState,
    flexRender,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    IconChevronLeft,
    IconChevronRight,
    IconPlayerSkipBack,
    IconPlayerSkipForward,
    IconTrashFilled,
} from "@tabler/icons-react"
import {
    DataTablePaginationProps,
    DataTableProps,
} from "@/interfaces/components/data-table"
import { FlatButton } from "@/components/common/flat-button"
import { Loader2 } from "lucide-react"

export function DataTable<TData, TValue>({
    columns,
    data,
    title,
    titleClassname,
    filterColumn,
    onDelete,
    isDeleting,
    className,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    const onHandleDelete = () => {
        const selectedIds = table
            .getFilteredSelectedRowModel()
            .flatRows.map((row) => (row.original as any).id)

        onDelete?.(selectedIds)
        setRowSelection({})
    }

    return (
        <div
            className={`bg-light-card px-8 py-4 rounded-xl shadow-lg ${className}`}
        >
            <div className="flex justify-between items-end py-2">
                <div className="flex flex-col items-start">
                    <div
                        className={`text-2xl font-semibold mb-4 ${titleClassname}`}
                    >
                        {title}
                    </div>
                    <Input
                        autoComplete="off"
                        placeholder={`Filter by ${filterColumn}...`}
                        value={
                            (table
                                .getColumn(filterColumn)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(filterColumn)
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                {onDelete && (
                    <FlatButton
                        disabled={isDeleting}
                        variant="destructive"
                        onClick={onHandleDelete}
                    >
                        {isDeleting ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <IconTrashFilled size={24} />
                        )}
                    </FlatButton>
                )}
            </div>

            <div className="rounded-lg border mb-4">
                <Table>
                    <TableHeader className="bg-background">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 20, 30].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <IconPlayerSkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <IconChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <IconChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <IconPlayerSkipForward className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
