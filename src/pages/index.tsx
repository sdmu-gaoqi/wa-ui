import React, { useRef, useEffect } from 'react'
import useCountDown from '../hooks/useCountDown'
import { useCss } from '../hooks'
import useClickAway from '../hooks/useClickAway'

const index = () => {
  const scrollRef = useRef(null)
  const scrollRef2 = useRef(null)
  const { count, run } = useCountDown()
  return (
    <div id="scrollWrapper" className={useCss({ abc123: 2 > 1 })} style={{ width: '100%', height: '100vh', overflow: 'hidden auto' }} onClick={run}>
      <div ref={scrollRef} style={{ width: '100%', height: '1000px', background: '#afa6a6' }}></div>
      <div ref={scrollRef2} style={{ width: '100%', height: '1000px', background: '#ee9c9c' }}></div>
    </div>
  )
}

export default index