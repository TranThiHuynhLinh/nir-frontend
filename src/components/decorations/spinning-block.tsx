import React from "react"

export const SpinningBlock = ({ className }: { className: string }) => {
    return (
        <div className={`decorations__spinner ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
