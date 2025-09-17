import { useCallback, useMemo, useState } from "react"
import { IPosition, IWindow } from "../../Interfaces/Common"
import { IPortfolioBoardItem } from "./PortfolioBoardItem"

const boardPadding = 30

export const BoardMap: React.FC<{
    portfolioBoardItems: React.ReactElement<IPortfolioBoardItem, any>[]
    themePreset?: string
    windowSize: IWindow
    boardWidth: number
    boardHeight: number
    windowPosition: IPosition
    setWindowPosition: React.Dispatch<React.SetStateAction<IPosition>>
}> = ({ boardHeight, boardWidth, windowPosition, setWindowPosition, portfolioBoardItems, windowSize, themePreset }) => {

    const [drag, setDrag] = useState(false)

    const scaling = useMemo(() => (30000 / windowSize.width), [windowSize])

    const stopDrag = useCallback(() => setDrag(false), [])
    const startDrag = useCallback(() => setDrag(true), [])

    const changeMapPosition = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        const map = e.currentTarget.getBoundingClientRect()

        const halfWindowWidth = (windowSize.width / 2) / scaling

        const halfWindowHeight = (windowSize.height / 2) / scaling

        let windowXPosition
        let windowYPosition

        if (e.type === 'mousedown' || e.type === 'mousemove') {
            let event = e as React.MouseEvent<HTMLDivElement, MouseEvent>
            windowXPosition = -((event.clientX - map.x - halfWindowWidth) / map.width) * boardWidth
            windowYPosition = -((event.clientY - map.y - halfWindowHeight) / map.height) * boardHeight
        }
        else {
            let event = e as React.TouchEvent<HTMLDivElement>

            windowXPosition = -((event.changedTouches[0].clientX - map.x - halfWindowWidth) / map.width) * boardWidth
            windowYPosition = -((event.changedTouches[0].clientY - map.y - halfWindowHeight) / map.height) * boardHeight
        }

        if (windowXPosition < -(boardWidth - halfWindowWidth * scaling * 2)) {
            windowXPosition = -(boardWidth - halfWindowWidth * scaling * 2)
        }
        if (windowXPosition > 0) {
            windowXPosition = 0
        }
        if (windowYPosition > 0) {
            windowYPosition = 0
        }
        if (windowYPosition < -(boardHeight - halfWindowHeight * scaling * 2)) {
            windowYPosition = -(boardHeight - halfWindowHeight * scaling * 2)
        }

        setWindowPosition({ x: windowXPosition, y: windowYPosition })
    }, [setWindowPosition, boardWidth, boardHeight, scaling, windowSize])

    return (
        <>
            <div className={`portfolioboard-map${themePreset ? ` ${themePreset}` : ''}`}
                style={{
                    width: boardWidth / scaling,
                    height: boardHeight / scaling,
                    top: boardPadding,
                    right: boardPadding
                }}
                onMouseLeave={stopDrag}
                onMouseDown={(e) => {
                    startDrag()
                    changeMapPosition(e)
                }}
                onTouchStart={startDrag}
                onTouchEnd={stopDrag}
                onMouseMove={(e) => {
                    if (drag) {
                        changeMapPosition(e)
                    }
                }}
                onTouchMove={(e) => {
                    if (drag) {
                        changeMapPosition(e)
                    }
                }}
            >
                <div className="portfolioboard-map-window"
                    style={{
                        top: -windowPosition.y / scaling, left: -windowPosition.x / scaling,
                        width: windowSize.width / scaling, height: windowSize.height / scaling
                    }}
                    onMouseDown={startDrag}
                    onMouseUp={stopDrag}
                    onTouchStart={startDrag}
                    onTouchEnd={stopDrag}
                />
                {portfolioBoardItems.map((item, index) => {
                    return <div
                        key={index}
                        className={`portfolioboard-object${item.props.className ? ` ${item.props.className}` : ''}`}
                        style={{...item.props.style, zoom: 1 / scaling }}>{item.props.children}
                    </div>
                })}
            </div>
        </>
    )
}