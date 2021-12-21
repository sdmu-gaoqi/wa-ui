import React from 'react'

interface SHOW {
    children?: any;
    show: any;
}

const Show:React.FC<SHOW> = (props: SHOW) => {
    const { show, children } = props
    return (
        <>
            { show ? children : <></> }
        </>
    )
}

export default Show