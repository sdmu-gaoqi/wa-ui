import useClickOutside from './useClickOutside'
import useRefState from './useRefState'
import { useEffect, useRef, useState } from 'react'

type ReturnType = [React.RefObject<HTMLDivElement>, React.RefObject<HTMLDivElement>, boolean, () => void, () => void]

export default function useDropdown(): ReturnType {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen, openRef] = useRefState(false)
  const [outTarget, setOutTarget] = useState([contentRef.current, ref.current])

  const open = () => {
    setIsOpen(!openRef.current)
  }
  const close = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(
        'click',
        (e: Event) => {
          const target = e?.target as Node
          if (!contentRef.current?.contains(target)) {
            open()
          }
        },
        true,
      )
    }
  }, [])

  useEffect(() => {
    setOutTarget([contentRef.current, ref.current])
  }, [isOpen])

  const notCloseRefs = outTarget?.filter((item) => !!item)

  useClickOutside(close, notCloseRefs)

  return [ref, contentRef, isOpen, open, close]
}
