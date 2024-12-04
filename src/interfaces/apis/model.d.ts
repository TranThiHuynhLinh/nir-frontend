interface IModelRes {
    id: string
    name: string
    type: string
    chemical?: string
    collectionId: string
    createdAt: string
    updatedAt: string
}

interface IRunModel {
    modelId: number
    type: string
    spectraId: number
    chemical?: string
}
