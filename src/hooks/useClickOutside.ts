import type { MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Window | Document

type EventMode = 'click' | 'mousedown'

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>

const getElement = (target: BasicTarget) => {
  if (!target) return

  if (typeof target === 'function') {
    return (target as () => TargetValue<Element>)()
  }

  if ('current' in target) {
    return target.current
  }

  return target
}

const useClickOutside = (
  callback: (event: MouseEvent) => void,
  target: BasicTarget | BasicTarget[],
  mode: EventMode = 'click',
) => {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    const targets = Array.isArray(target) ? target : [target]

    const handler = (event: MouseEvent) => {
      const clickInside = targets.some((item) => {
        const element = getElement(item)
        return !element || element.contains(event.target as Node)
      })
      if (clickInside) return
      callbackRef.current(event)
    }

    document.addEventListener(mode, handler)

    return () => {
      document.removeEventListener(mode, handler)
    }
  }, [target])
}

export default useClickOutside
