import React, { useRef } from 'react'
import useRefState from './useRefState'

interface UseCountDownProps {
  limit?: number
  interval?: number
}

const useCountDown = (props: UseCountDownProps = {}) => {
  const { limit = 60, interval = 1000 } = props
  const timer = useRef<any>(null)
  const [count, setCount, countRef] = useRefState(0)
  const run = () => {
    timer.current = setInterval(() => {
      const nowCount = countRef.current <= 0 ? limit : countRef.current - 1
      setCount(nowCount)
      if(countRef.current === 1) {
        clearInterval(timer.current)
        timer.current = null
      }
    }, interval)
  }
  return {
    count,
    run
  }
}

export default useCountDown