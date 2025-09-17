import { IPosition, IWindow } from "../Interfaces/Common"

export function calculateBoardLimit(newPosition: IPosition, windowSize: IWindow, boardSize: IWindow) {
    let coord: keyof IPosition
    for (coord in newPosition) {
        if (newPosition[coord] > 0) {
            newPosition[coord] = 0
        }
    }

    const maxWidth = (windowSize.width - boardSize.width)
    if (newPosition.x < (maxWidth)) {
        newPosition.x = maxWidth
    }
    const maxHeight = (windowSize.height - boardSize.height)
    if (newPosition.y < (maxHeight)) {
        newPosition.y = maxHeight
    }
    return { ...newPosition }
}