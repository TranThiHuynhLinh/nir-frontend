export interface IUserSpectraSendBody {
    name: string
    description?: string
    data: number[]
}
export const createSpectraValidate = (data: IUserSpectraSendBody) => {
    if (!data.name) return "Spectra's name is required"
    if (!data.data) return "Spectra's data is required"
}
