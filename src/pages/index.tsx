import React from 'react'
import './index.css'
import { useSubPub } from '../hooks'
import Test from './test'

const index = () => {
  const { onSub } = useSubPub()
  onSub('name', (val) => {
    console.log(val)
  })
  return (
    <div>
      <Test></Test>
    </div>
  )
}

export default index