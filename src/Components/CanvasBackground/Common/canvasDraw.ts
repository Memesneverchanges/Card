export interface IPosition {
    x: number, y: number
}

export interface IConcentration {
    value: number
    mode: number
}

export interface IStartingMovingCircleParameters {
    position?: IPosition
    vector?: IPosition
}

export interface IMovingCircle {
    position: IPosition
    vector: IPosition
    concentration: IConcentration
    nature?: boolean
}

export interface IStrictingLine {
    start: IPosition
    end: IPosition
    length: number
}
export interface IWindowSize {
    width: number,
    height: number
}


export const drawLines = (ctx: CanvasRenderingContext2D, lines: IStrictingLine[]) => {
    ctx.strokeStyle = 'white'
    for (let line of lines) {
        ctx.beginPath();
        ctx.moveTo(Math.round(line.start.x), Math.round(line.start.y));
        ctx.lineWidth = 40 / Math.max(line.length, 40)
        ctx.lineTo(Math.round(line.end.x), Math.round(line.end.y));
        ctx.stroke();
    }
}

export const clearCanvas = (ctx: CanvasRenderingContext2D, size: IWindowSize) => {
    ctx.clearRect(0, 0, size.width, size.height);
}

export const drawBackgroundImage = (ctx: CanvasRenderingContext2D, size: IWindowSize) => {
    ctx.beginPath();
    let gradient = ctx.createLinearGradient(0, 0, size.width, 0);
    gradient.addColorStop(0, '#A175FF')
    gradient.addColorStop(1, '#db6262')
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height)
}

export const drawCircles = (movingCircles: IMovingCircle[], ctx: CanvasRenderingContext2D) => {

    for (let movingCicle of movingCircles) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.arc(Math.round(movingCicle.position.x), Math.round(movingCicle.position.y), 2, 0, Math.PI * 2)
        ctx.fill()
        
    }
    for (let movingCicle of movingCircles) {
        let r = 3 + (3 * movingCicle.concentration.value)
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.arc(Math.round(movingCicle.position.x), Math.round(movingCicle.position.y), r, 0, Math.PI * 2)
        ctx.fill()
    }
}
