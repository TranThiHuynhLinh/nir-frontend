interface ITrainingSpectra {
    id: number
    name: string | null
    data: number[]
}

interface ITrainingClassifySpectraEdit {
    id: number
    data: number[]
}

interface ITrainingAnalystSpectraEdit {
    id: number
    data: string
}

interface ICollectionUpload {
    name: string
    data: File
}

interface ICollectionChange {
    collectionId: string
    newName: string
}

interface ICollectionRes {
    id: string
    name: string
    type: string
    createdAt: string
}

interface ICollectionClassifyDensityRes {
    name: string
    density: number
}

interface ICollectionDetailRes {
    id: int
    name: string
    type: string
    createdAt: string
    TrainingSpectra: ITrainingSpectra[]
}

interface ITrainingSpectraDelete {
    ids: number[]
    type: string
}

interface IDataAttributes {
    cow_id: string
    fat: string
    prot: string
    lact: string
    scc: string
    urea: string
    milkYield: string
    milkInterv: string
    set: string
}

interface IDataItem {
    attributes: IDataAttributes
    data: number[]
}
interface IProcessedData
    extends Omit<ITrainingSpectra, "name">,
        Partial<IDataAttributes> {
    name: string | null
    collectionId: number
}
