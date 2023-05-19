import React from 'react'
import { useDropdown, useSubPub } from '../hooks'
import InputNumber from '../components/inputNumber'

const Test = () => {
    const { onPub } = useSubPub()
    const [ref, containerRef, isOpen] = useDropdown()
  return (
    <>
    <div ref={ref} onClick={() => {
        onPub('name', Math.random().toString(16))
    }}>test</div>
    <InputNumber onOk={(v) => {
      console.log(v)
    }} />
    </>
  )
}

export default Test