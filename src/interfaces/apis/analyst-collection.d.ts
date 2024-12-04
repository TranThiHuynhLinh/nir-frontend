interface IMostFrequent {
    value: number
    count: number
}

interface ILeastFrequent {
    value: number
    count: number
}

interface IFrequencyStats {
    mostFrequent: IMostFrequent
    leastFrequent: ILeastFrequent
    medianFrequency: number
}

interface IRangeStats {
    min: number
    max: number
    mean: number
    median: number
}

interface IDataAnalystAttributes {
    cow_id: IFrequencyStats
    fat: IRangeStats
    prot: IRangeStats
    lact: IRangeStats
    scc: IRangeStats
    urea: IRangeStats
    milkYield: IRangeStats
    milkInterv: IRangeStats
    set: IFrequencyStats
}

interface IDataMultipleBarChart {
    name: string
    min: number
    max: number
    mean: number
    median: number
}

interface ICollectionAnalystRes {
    name: string
    createdAt?: string
    totalSpectras: number
    density?: ICollectionClassifyDensityRes[]
    attributesStats?: IDataAnalystAttributes
}
