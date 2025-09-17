import { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react"
import { BoardMap } from "./BoardMap"
import { IPosition, IWindow } from "../../Interfaces/Common"
import { calculateWindowPosition } from "../../Common/calculateWindowPosition"
import { CanvasAnimationMemo } from "../CanvasBackground/Components/CanvasAnimation"
import React from "react"
import { calculateBoardLimit } from "../../Common/calculateBoardLimit"
import { IPortfolioBoardItem } from "./PortfolioBoardItem"
import { getPortfolioboardElement } from "../../Common/getPortfolioboardElement"

export interface PortfolioBoardRef {
    gotoBoard(boardId: string): void
}

export interface IPortfolioBoard {
    themePreset: string
    width: number
    height: number
    children: React.ReactElement<IPortfolioBoardItem, any>[]
}

export const PortfolioBoard = React.forwardRef<PortfolioBoardRef, IPortfolioBoard>(({ children, themePreset, height, width }, ref) => {

    const portfolioboard = useRef<HTMLDivElement>(null)
    const [startDragMousePosition, setStartDragMousePosition] = useState<IPosition>()
    const [dragedWindowPosition, setDragedWindowPosition] = useState<IPosition>()
    const [windowSize, setWindowSize] = useState<IWindow>({ width: window.innerWidth, height: window.innerHeight })
    const [windowPosition, setWindowPosition] = useState<IPosition>({ x: -1 * (width / 2 - (windowSize.width / 2)), y: -1 * (height / 2 - (windowSize.height / 2)) })

    useEffect(() => {
        window.onkeydown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault()
            }
        }
        window.onresize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            setWindowPosition(calculateWindowPosition(0, 0, { ...windowPosition }, { width: window.innerWidth, height: window.innerHeight }, { width, height }))
        }
        return () => {
            window.onresize = null
            window.onkeydown = null
        }
    }, [windowPosition, width, height])

    const startDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        setDragedWindowPosition(windowPosition)
        if (e.type === 'mousedown') {
            let element = getPortfolioboardElement(e.target as HTMLElement)
            if (element)
                if (element.className.includes('hovered'))
                    return

            let event = e as React.MouseEvent<HTMLDivElement, MouseEvent>

            if (event.button < 2)
                setStartDragMousePosition({ x: event.screenX, y: event.screenY })
        }
        else {
            let event = e as React.TouchEvent<HTMLDivElement>
            setStartDragMousePosition({ x: event.changedTouches[0].screenX, y: event.changedTouches[0].screenY })
        }
    }, [windowPosition])

    const onDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {

        if (startDragMousePosition && dragedWindowPosition) {
            let dx: number
            let dy: number

            if (e.type === 'mousemove') {
                let event = e as React.MouseEvent<HTMLDivElement, MouseEvent>
                dx = Math.floor(startDragMousePosition.x - event.screenX)
                dy = Math.floor(startDragMousePosition.y - event.screenY)
            }
            else {
                let event = e as React.TouchEvent<HTMLDivElement>
                dx = Math.floor(startDragMousePosition.x - event.changedTouches[0].screenX)
                dy = Math.floor(startDragMousePosition.y - event.changedTouches[0].screenY)
            }

            setWindowPosition(calculateWindowPosition(dx, dy, { ...dragedWindowPosition }, windowSize, { width, height }))
        }
    }, [startDragMousePosition, dragedWindowPosition, width, height, windowSize])

    const endDrag = useCallback(() => {
        setStartDragMousePosition(undefined)
    }, [])

    const gotoBoard = useCallback((boardId: string) => {
        const board = document.getElementById(boardId)
        if (board) {
            let leftOffset
            if (windowSize.width > board.offsetWidth) {
                leftOffset = -1 * (board.offsetLeft - ((windowSize.width - board.offsetWidth) / 2))
            }
            else {
                leftOffset = -1 * board.offsetLeft + 20
            }

            let topOffset
            if (windowSize.height > board.offsetHeight) {
                topOffset = -1 * (board.offsetTop - ((windowSize.height - board.offsetHeight) / 2))
            }
            else {
                topOffset = -1 * board.offsetTop + 20
            }
            let position = calculateBoardLimit({ x: leftOffset, y: topOffset }, windowSize, { width, height })
            setWindowPosition(position)
        }

    }, [width, height, windowSize])

    useImperativeHandle(ref, () => ({
        gotoBoard
    }), [gotoBoard])
    return (
        <>
            <BoardMap
                themePreset={themePreset}
                portfolioBoardItems={children}
                boardHeight={height}
                boardWidth={width}
                windowSize={windowSize}
                windowPosition={windowPosition}
                setWindowPosition={setWindowPosition}
            />
            <CanvasAnimationMemo
                className="portfolioboard-background" style={{ position: 'absolute', width: width, height: height, transform: `translate(${windowPosition.x}px,${windowPosition.y}px)` }}

            />
            <div id="portfolioboard" className={`portfolioboard ${themePreset ? themePreset : ''}`}
                ref={portfolioboard}
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                onMouseUp={endDrag}
                onTouchEnd={endDrag}
                onTouchMove={onDrag}
                onMouseMove={onDrag}
                onMouseLeave={endDrag}
                style={{ cursor: startDragMousePosition ? 'grabbing' : 'grab', width: width, height: height, transform: `translate(${windowPosition.x}px,${windowPosition.y}px)`, display: 'flex' }}>
                {children}
            </div>
        </>
    )
})