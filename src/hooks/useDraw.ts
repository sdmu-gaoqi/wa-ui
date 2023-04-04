import React from 'react'

interface CanvasProps {
    width?: string
    height?: string
}

const useDraw = (ref: React.MutableRefObject<null> | string, canvasProps: CanvasProps = {}) => {
    const { width = '100%', height = '100%' } = canvasProps
    const drawRef = React.useRef<any>(null)
    const getElement = () => {
        return typeof ref === 'string' ? document.querySelector(ref) : ref.current
    }
    const init = () => {
        const element = getElement()
        const drawBox = document.createElement('canvas')
        drawBox.setAttribute('width', (element as HTMLElement).offsetWidth + '')
        drawBox.setAttribute('height', (element as HTMLElement).offsetHeight + '')
        if(!element) {
            console.error('找不到目标')
            return
        }
        drawRef.current = drawBox
        element.appendChild(drawBox)
    }
    return {
        init
    }
}

export default useDraw