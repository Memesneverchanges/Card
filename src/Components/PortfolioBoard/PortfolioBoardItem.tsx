import { useState } from "react"

export interface IPortfolioBoardItem {
    id?: string
    style?: React.CSSProperties
    className?: string
    children: JSX.Element | JSX.Element[]
}

let timeout: NodeJS.Timeout

export const PortfolioBoardItem: React.FC<IPortfolioBoardItem> = ({ children, style, id, className }) => {

    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <div
                id={id}
                className={`portfolioboard-object ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={() => {
                    timeout = setTimeout(() => {
                        setIsHovered(true)
                    }, 700)
                }}
                onMouseLeave={() => {
                    clearTimeout(timeout)
                    setIsHovered(false)
                }}
                style={{
                    ...style,
                    userSelect: isHovered ? 'text' : undefined
                }}>
                    <div className={className}>
                {children}
                </div>
            </div>
        </>
    )
}