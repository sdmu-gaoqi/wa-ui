import { useEffect, useRef } from 'react'

type CallbackType = (...arg: any) => void

class EventEmitter {
  private subscriptions = new Map<string, Set<CallbackType>>()

  setGlobalState = (event: string, val: any) => {
    if (this.subscriptions && this.subscriptions.has(event)) {
      const cbs = this.subscriptions.get(event)
      cbs?.forEach((cb) => {
        cb(val)
      })
    }
  }

  onGlobalStateChange = (event: string, callback: CallbackType) => {
    const callbackRef = useRef<CallbackType>()
    callbackRef.current = callback
    useEffect(() => {
      function subscription(val: any) {
        if (callbackRef.current) {
          callbackRef.current(val)
        }
      }
      if (this.subscriptions.has(event)) {
        const cbs = this.subscriptions.get(event)
        cbs?.add(subscription)
      } else {
        this.subscriptions.set(event, new Set([subscription]))
      }
      return () => {
        if (this.subscriptions && this.subscriptions.has(event)) {
          const cbs = this.subscriptions.get(event)
          cbs?.delete(subscription)
        }
      }
    }, [])
  }
}

const useEventEmitter = () => {
  const ref = useRef<EventEmitter>()
  if (!ref.current) {
    ref.current = new EventEmitter()
  }
  return ref.current
}

export default useEventEmitter
