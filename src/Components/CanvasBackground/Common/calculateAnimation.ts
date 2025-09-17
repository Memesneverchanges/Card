import { IConcentration, IMovingCircle, IPosition, IStartingMovingCircleParameters, IStrictingLine, IWindowSize } from "./canvasDraw"
import { getRandomBoolean, getRandomInt, randn_bm } from "./getRandom"


export const generateVectorValue:(direction?:{x?:1|-1,y?:1|-1})=>IPosition = (direction) => ({
    x: randn_bm(0.6, 100, 10.2) * (direction?.x!==undefined?direction.x:getRandomBoolean() ? 1 : -1),
    y: randn_bm(0.6, 100, 10.2) * (direction?.y!==undefined?direction.y:getRandomBoolean() ? 1 : -1)
})

export const generateConcentrationValue:()=>IConcentration=()=>({mode:0.01*(getRandomBoolean() ? 1 : -1),value:Math.random()})

export const generateMovingCircle = (size: IWindowSize, startingParameters?: IStartingMovingCircleParameters) => { //  vector:[0.05;0.25]
    const movingCicle: IMovingCircle = {
        position:startingParameters?.position?startingParameters.position: {
            x: getRandomInt(size.width),
            y: getRandomInt(size.height)
        },
        vector:startingParameters?.vector?startingParameters.vector: generateVectorValue(),
        concentration: generateConcentrationValue(),
        nature: startingParameters ? false : true
    }
    return movingCicle
}

export const generateEnteringMovingCircle = (size: IWindowSize) => {

    let partOfWindow = getRandomInt(4)

    let position: IPosition

    let vector: IPosition

    switch (partOfWindow) {
        case (0): {
            position = {
                x: getRandomInt(size.width),
                y: size.height
            }
            vector = generateVectorValue({y:-1}) 
            break;
        }
        case (1): {
            position = {
                x: size.width,
                y: getRandomInt(size.height)
            }
            vector = generateVectorValue({x:-1}) 
            break;
        }
        case (2): {
            position = {
                x: getRandomInt(size.width),
                y: 0
            }
            vector = generateVectorValue({y:1}) 
            break;
        }
        case (3): {
            position = {
                x: 0,
                y: getRandomInt(size.height)
            }
            vector =generateVectorValue({x:1}) 
            break;
        }
        default: throw new Error('asd')
    }

    const movingCicle: IMovingCircle = {
        position,
        vector,
        concentration: generateConcentrationValue(),
        nature: true
    }
    return movingCicle
}

export const rebuildOutMovingCircles = (movingCircles: IMovingCircle[], size: IWindowSize) => {
    for (let i = 0; i < movingCircles.length; i++) {
        if (movingCircles[i].position.x < 0 || movingCircles[i].position.x > size.width || movingCircles[i].position.y < 0 || movingCircles[i].position.y > size.height) {
            if (movingCircles[i].nature) {
                movingCircles.splice(i, 1, generateEnteringMovingCircle(size))
            }
            else {
                movingCircles.splice(i, 1)
            }
        }
    }
}

export const calculateMovingCircles = (movingCircles: IMovingCircle[]) => {
    for (let movingCircle of movingCircles) {
        movingCircle.position.x += movingCircle.vector.x
        movingCircle.position.y += movingCircle.vector.y
        if (movingCircle.concentration.value >= 0.7) {
            movingCircle.concentration.mode = -0.01
        }

        if (movingCircle.concentration.value <= 0) {
            movingCircle.concentration.mode = 0.01
        }

        movingCircle.concentration.value += movingCircle.concentration.mode
    }
}

export const generateMovingCircles = (amount: number, size: IWindowSize) => {
    const movingCircles: IMovingCircle[] = []
    for (let i = 0; i < amount; i++) {
        movingCircles.push(generateMovingCircle(size))
    }
    return movingCircles
}

export const getLength = (position1: IPosition, position2: IPosition) => {
    return Math.sqrt(Math.pow((position1.y - position2.y),2) + Math.pow((position1.x - position2.x),2))
}

export const detectLines = (movingCircles: IMovingCircle[], mouseCoords?: IPosition) => {
    const lines: IStrictingLine[] = []

    for (let i = 0; i < movingCircles.length; i++) {
        if(mouseCoords){
            let length = getLength(movingCircles[i].position, mouseCoords)
            if (length < 300) {
                lines.push({ start: { x: movingCircles[i].position.x, y: movingCircles[i].position.y }, end: { x: mouseCoords.x, y: mouseCoords.y }, length })
            }
        }

        for (let j = i + 1; j < movingCircles.length; j++) {
            let length = getLength(movingCircles[i].position, movingCircles[j].position)
            if (length < 300) {
                lines.push({ start: { x: movingCircles[i].position.x, y: movingCircles[i].position.y }, end: { x: movingCircles[j].position.x, y: movingCircles[j].position.y }, length })
            }
        }

    }

    return lines
}