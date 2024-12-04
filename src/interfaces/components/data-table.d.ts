import { ColumnDef, Table } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title?: string
    titleClassname?: string
    filterColumn: string
    onDelete?: (ids: string[]) => void
    isDeleting?: boolean
    className?: string
}

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}
