import { IconPrompt } from "@tabler/icons-react"

export const AppLogo = ({ className }: { className?: string }) => {
    return (
        <div
            className={`text-2xl font-bold flex justify-center items-center ${className}`}
        >
            <IconPrompt size={36} className="text-accent mr-2" />
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                    <span className="">NIR</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                    <span className="">NIR</span>
                </div>
            </div>
        </div>
    )
}
