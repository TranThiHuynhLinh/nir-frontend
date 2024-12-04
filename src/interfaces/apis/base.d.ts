interface IBaseAPIRes {
    status?: number
}

interface IErrorAPIRes extends IBaseAPIRes {
    response?: {
        data?: {
            error?: string
            message?: string
        }
    }
}
