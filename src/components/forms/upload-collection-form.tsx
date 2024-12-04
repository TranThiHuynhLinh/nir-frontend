import { useRef, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FlatButton } from "@/components/common/flat-button"

import { useUploadCollectionMutation } from "@/redux/services/admin/data.api"
import { enums } from "@/utils/constants"

export const UploadCollectionForm = ({ className }: { className?: string }) => {
    const [uploadCollection, { isLoading: isUploading }] =
        useUploadCollectionMutation()
    const [csvFile, setCsvFile] = useState<File | null>(null)
    const [collectionName, setCollectionName] = useState("")
    const [modelType, setModelType] = useState("")
    const [attributes, setAttributes] = useState<
        { field: string; column: number }[]
    >([{ field: "", column: 0 }])
    const [dataRange, setDataRange] = useState({ start: 0, end: 0 })
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setCsvFile(file)
        }
    }

    const handleAttributeChange = (
        index: number,
        key: "field" | "column",
        value: string | number
    ) => {
        const updatedAttributes = [...attributes]
        updatedAttributes[index] = {
            ...updatedAttributes[index],
            [key]: value,
        }
        setAttributes(updatedAttributes)
    }

    const handleAddAttribute = () => {
        setAttributes([...attributes, { field: "", column: 0 }])
    }

    const handleRemoveAttribute = (index: number) => {
        setAttributes(attributes.filter((_, i) => i !== index))
    }

    const handleUpload = async () => {
        if (!csvFile || !collectionName) {
            toast.error("Please provide a file and collection name.")
            return
        }

        const analystDataFormat = {
            attributes: attributes.filter((attr) => attr.field && attr.column),
            dataRange,
        }

        const formData = new FormData()
        formData.append("name", collectionName)
        formData.append("file", csvFile)
        formData.append("type", modelType)
        formData.append("analystDataFormat", JSON.stringify(analystDataFormat))

        try {
            await uploadCollection(formData).unwrap()
            toast.success("Success!")
        } catch (err: any) {
            toast.error(err.data?.message || "Failed to upload collection!")
        } finally {
            setCollectionName("")
            setCsvFile(null)
            setAttributes([{ field: "", column: 0 }])
            setDataRange({ start: 0, end: 0 })

            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    return (
        <div
            className={`${
                modelType === enums.MODEL_TYPE.ANALYST ? "" : "h-[300px]"
            } flex flex-col gap-y-4 px-6 py-4 bg-light-card rounded-xl shadow-lg overflow-y-auto ${className}`}
        >
            <div className="text-2xl font-semibold text-foreground">
                Create a new collection
            </div>
            <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <Input
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter Collection Name"
            />
            <div className="flex gap-x-4 justify-between items-center">
                <p className="font-medium ml-2">Type model: </p>
                <Select onValueChange={setModelType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={enums.MODEL_TYPE.CLASSIFY}>
                                {enums.MODEL_TYPE.CLASSIFY}
                            </SelectItem>
                            <SelectItem value={enums.MODEL_TYPE.ANALYST}>
                                {enums.MODEL_TYPE.ANALYST}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {modelType === enums.MODEL_TYPE.ANALYST && (
                <div className="flex flex-col gap-y-4">
                    <div className="font-medium">Define Attributes:</div>
                    {attributes.map((attr, index) => (
                        <div key={index} className="flex gap-x-4 items-center">
                            <Input
                                value={attr.field}
                                onChange={(e) =>
                                    handleAttributeChange(
                                        index,
                                        "field",
                                        e.target.value
                                    )
                                }
                                placeholder="Field name"
                            />
                            <Input
                                type="number"
                                value={attr.column || ""}
                                onChange={(e) =>
                                    handleAttributeChange(
                                        index,
                                        "column",
                                        parseInt(e.target.value, 10)
                                    )
                                }
                                placeholder="Column number"
                            />
                            <button
                                onClick={() => handleRemoveAttribute(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={handleAddAttribute}
                        className="text-blue-500 hover:underline"
                    >
                        Add Attribute
                    </button>

                    <div className="font-medium">Define Data Range:</div>
                    <div className="flex gap-x-4 items-center">
                        <Input
                            type="number"
                            value={dataRange.start || ""}
                            onChange={(e) =>
                                setDataRange({
                                    ...dataRange,
                                    start: parseInt(e.target.value, 10),
                                })
                            }
                            placeholder="Start"
                        />
                        <Input
                            type="number"
                            value={dataRange.end || ""}
                            onChange={(e) =>
                                setDataRange({
                                    ...dataRange,
                                    end: parseInt(e.target.value, 10),
                                })
                            }
                            placeholder="End"
                        />
                    </div>
                </div>
            )}

            <FlatButton onClick={handleUpload}>
                {isUploading && <Loader2 className="animate-spin mr-2" />}
                Upload
            </FlatButton>
        </div>
    )
}
