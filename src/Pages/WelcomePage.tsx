import React, { useCallback, useImperativeHandle } from "react"
import { ReactElement, useEffect, useState } from "react"
import { TLocalization } from "../Reducers/appReducer"

export interface WelcomePageRef {
    reset: () => void
}

export const WelcomePage = React.forwardRef<WelcomePageRef, {
    localication:TLocalization
    timeToHide: number
    onHiding?: () => void
    children?: ReactElement | ReactElement[]
}>(({ localication,children, timeToHide, onHiding }, ref) => {

    const [visibility, setVisibility] = useState(true)
    const [textOpacity, setTextOpacity] = useState(true)

    useEffect(() => {
        if (visibility) {
            setTimeout(() => {
                setTextOpacity(false)
                setTimeout(() => {
                    setVisibility(false)
                    if (onHiding)
                        onHiding()
                }, 500)
            }, timeToHide)
        }
    }, [visibility, timeToHide, onHiding])

    const reset = useCallback(() => {
        setVisibility(true)
        setTextOpacity(true)
    }, [])

    useImperativeHandle(ref, () => ({
        reset
    }), [reset])

    return (
        <>
            <div className="welcome-page" style={{ opacity: visibility ? 1 : 0, visibility: visibility ? 'visible' : 'hidden' }}>
                <div className="welcome-page-message" style={{ filter: textOpacity ? 'blur(0px)' : 'blur(10px)' }}>
                   {localication==='en'?'Welcome':'Добро пожаловать'} 
                </div>
            </div>
            <div className={`welcome-page-container ${visibility ? 'welcome-page-container-blur' : ''} `}>
                {children}
            </div>
        </>
    )
})