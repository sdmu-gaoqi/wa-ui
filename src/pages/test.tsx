import React from 'react'
import { useSubPub } from '../hooks'

const Test = () => {
    const { onPub } = useSubPub()
  return (
    <div onClick={() => {
        onPub('name', Math.random().toString(16))
    }}>test</div>
  )
}

export default Test