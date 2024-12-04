import React, { useState } from "react"
import { ModalBody, ModalProvider, ModalTrigger } from "../ui/animated-modal"
import { IUserSpectraSendBody } from "@/app/schema/spectra.validate"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { FlatButton } from "@/components/common/flat-button"
import { Loader2 } from "lucide-react"
import { useCreateUserSpectraMutation } from "@/redux/services/client/spectra.api"

const convertTextToSpectraArray = (text: string) => {
    const textArray = text.trim().split(/\s+/)
    const spectraData = textArray.map((value) => parseFloat(value))
    return spectraData
}

const CreateSpectraModal = ({ children }: { children: React.ReactNode }) => {
    return <ModalProvider>{children}</ModalProvider>
}

const CreateSpectraModalTrigger = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return <ModalTrigger className={className}>{children}</ModalTrigger>
}

const initData: IUserSpectraSendBody = {
    name: "",
    description: "",
    data: [],
}

const CreateSpectraModalBody = ({ className }: { className?: string }) => {
    const [uploadUserSpectra, { isLoading }] = useCreateUserSpectraMutation()

    const [formData, setFormData] = useState<IUserSpectraSendBody>(initData)
    const { name, description, data } = formData
    const [rawData, setRawData] = useState<string>("")
    const handleOnChange = (field: keyof IUserSpectraSendBody, value: string) => {
        if (field === "data") {
            setRawData(value)
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }))
        }
    }

    const handleUploadUserSpectra = async () => {
        try {
            const spectraArray = convertTextToSpectraArray(rawData)
            const updatedFormData = { ...formData, data: spectraArray }
            await uploadUserSpectra(updatedFormData).unwrap()
            toast.success("Upload spectra successfully")
            setFormData(initData)
            setRawData("")
        } catch (err: any) {
            toast.error(err.data.message || "Failed to Upload spectra")
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleUploadUserSpectra()
        }
    }
    return (
        <ModalBody className={`p-6 min-w-[50%] min-h-[68vh] ${className}`}>
            <div
                className={`flex flex-col gap-y-4 bg-light-card rounded-xl min-h-[500px] ${className}`}
            >
                <div className="text-2xl font-semibold text-foreground">Upload your spectra</div>
                <div className="text-md font-medium text-foreground/50">
                    The spectrum's data does not over 512
                </div>
                <div className="flex justify-between gap-x-4">
                    <div className="flex flex-col items-start gap-y-2 w-[50%]">
                        <Label htmlFor="upload-user-spectra-name" className="text-md">
                            Spectra's name
                        </Label>
                        <Input
                            id="upload-user-spectra-name"
                            required
                            autoComplete="none"
                            value={name}
                            onChange={(e) => handleOnChange("name", e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[100%] p-2"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-y-2 w-full">
                        <Label htmlFor="upload-user-spectra-name" className="text-md">
                            Spectra's description
                        </Label>
                        <Input
                            id="upload-user-spectra-name"
                            required
                            autoComplete="none"
                            value={description}
                            onChange={(e) => handleOnChange("description", e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-[100%] p-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-y-2 ">
                    <Label htmlFor="upload-user-spectra-data" className="text-md">
                        Spectra's data
                    </Label>
                    <textarea
                        id="upload-user-spectra-data"
                        required
                        autoComplete="none"
                        value={rawData}
                        onChange={(e) => handleOnChange("data", e.target.value)}
                        className="w-[100%] h-[240px] p-2 bg-background"
                        style={{ resize: "none" }}
                    />
                </div>
                <FlatButton onClick={handleUploadUserSpectra}>
                    {isLoading && <Loader2 className="animate-spin mr-2" size={28} />}
                    Upload
                </FlatButton>
            </div>
        </ModalBody>
    )
}

export { CreateSpectraModal, CreateSpectraModalBody, CreateSpectraModalTrigger }
