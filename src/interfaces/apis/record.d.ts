interface IRecordRes {
    id: number
    clientSpectraId: number
    userId: number
    classify?: string
    analyst?: string
    chemical?: string
    createdAt: string
    updatedAt: string
}

interface IResultRecord {
    classify?: string
    analyst?: string
    chemical?: string
}
