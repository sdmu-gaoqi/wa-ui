import { RefObject, useEffect } from "react"

interface UseScrollProps {
    el: RefObject<HTMLElement> | string,
    scrollEl: RefObject<HTMLElement> | string
}

const useScroll = (props: UseScrollProps) => {
  const { el, scrollEl } = props
  const scrollTo = () => {
    const element = typeof el === 'string' ? document.querySelector(el) : el.current
    const scrollElement = (typeof scrollEl === 'string' ? document.querySelector(scrollEl) : scrollEl.current) as HTMLElement
    if(!element || !scrollElement) {
      return console.error('scroll元素不存在')
    }
    const top = (element as HTMLElement)?.offsetTop
    console.log(top, 'top')
    scrollElement.style.scrollBehavior = 'smooth'
    scrollElement.scrollTo({ top })
  }
  return [scrollTo]
}

export default useScroll