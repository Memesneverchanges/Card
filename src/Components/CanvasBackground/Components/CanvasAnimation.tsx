import { useEffect, useRef, useState } from "react"
import { calculateMovingCircles, detectLines, generateMovingCircle, generateMovingCircles, rebuildOutMovingCircles } from "../Common/calculateAnimation"
import { clearCanvas, drawCircles, drawLines, IMovingCircle, IPosition } from "../Common/canvasDraw"
import React from "react"

let movingCircles: IMovingCircle[]

let mouseCoords: IPosition|undefined

let animation: number

export const CanvasAnimation: React.FC<{
    style?: React.CSSProperties
    className?: string
}> = ({ className, style }) => {
    const canvas = useRef<HTMLCanvasElement>(null)

    const [size, setSize] = useState({ width: canvas.current?.width ?? 0, height: canvas.current?.height ?? 0 })

    useEffect(() => {
        setSize({ width: style?.width as number ?? 0, height: style?.height as number ?? 0 })
    }, [style?.width, style?.height])

    useEffect(() => {
        window.onmousemove = (e) => {
            const target = e.target as HTMLElement
            if (target.id === 'portfolioboard') {
                mouseCoords = { x: e.offsetX, y: e.offsetY }
            }
      
        }
        window.onmouseout=(e)=>{ mouseCoords = undefined}
        return () => {
            window.onmousemove = null
            window.onmouseover = null
        }
    }, [])

    useEffect(() => {
        window.onmousedown = (e) => {
            const target = e.target as HTMLElement
            if (target.id === 'portfolioboard') {
                movingCircles.push(generateMovingCircle(size, { position: { x: e.offsetX, y: e.offsetY } }))
            }

        }
        return () => {
            window.onmousedown = null
        }
    }, [size])

    useEffect(() => {
        
        let ctx = canvas.current?.getContext('2d')

        movingCircles = generateMovingCircles(Math.round(size.width / 48), size)
        
        const updateCanvas = () => {

            if (ctx) {
                
                clearCanvas(ctx, size)
                
                rebuildOutMovingCircles(movingCircles, size)
                calculateMovingCircles(movingCircles)
                

                drawLines(ctx, detectLines(movingCircles, mouseCoords))  

                drawCircles(movingCircles, ctx)

                animation = window.requestAnimationFrame(updateCanvas)
            }
        }

        updateCanvas()

        return () => {
            window.cancelAnimationFrame(animation)
        }
    }, [size])

    return (
        <>
            <canvas className={className} style={style}
                width={style?.width}
                height={style?.height}
                ref={canvas}
            />
        </>
    )
}

export const CanvasAnimationMemo = React.memo(CanvasAnimation)