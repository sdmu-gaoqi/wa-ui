import React, { useRef, useEffect } from 'react'
import useCountDown from '../hooks/useCountDown'
import { useCss } from '../hooks'
import { useDraw, useClickAway } from '../hooks'
import useDropDown from '../hooks/useDropDown'

const index = () => {
  const [containerRef, isOpen, open, close] = useDropDown()
  return (
    <div ref={containerRef}>
      <div onClick={open}>按钮</div>
      { isOpen && <>展示</> }
    </div>
  )
}

export default index