import React from 'react'

const useClickAway = (todo: () => void, deeps: Array<Element | React.MutableRefObject<null>> | null) => {
    const click = (event) => {
        const isAway = deeps?.some((elItem) => {
            const element = (typeof elItem === 'object' && 'current' in elItem) ? elItem?.current : elItem
            return element!.contains(event.target)
        })
        if(!isAway) {
            todo()
        }
    }
    React.useEffect(() => {
        document.body.addEventListener('click', click)
        return () => {
            document.body.removeEventListener('click', click)
        }
    })
}

export default useClickAway