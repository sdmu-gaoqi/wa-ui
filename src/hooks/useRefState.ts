import React, { useRef, useState, useEffect } from 'react'

const useRefState = <T>(data: T): [T, React.Dispatch<React.SetStateAction<T>>, { current: T }] => {
  const [state, setState] = useState(data)
  const dataRef = useRef(data)
  const changeState = (data: T) => {
    setState(data)
    dataRef.current = data
  }
  return [
    state,
    changeState,
    dataRef
  ]
}

export default useRefState