import React, { useRef, useEffect } from 'react'
import useCountDown from '../hooks/useCountDown'
import { useCss } from '../hooks'
import { useDraw, useClickAway } from '../hooks'
import useDropDown from '../hooks/useDropDown'
import useSafeState from '../hooks/useSafeState'

const index = () => {
  const [state, setState, safeState] = useSafeState({ age: 0 })
  return (
    <div onClick={() => {
      setState({ ...state, age: state.age + 1 })
      console.log(safeState, state)
    }}>
      添加
    </div>
  )
}

export default index