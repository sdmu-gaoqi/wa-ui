import React from 'react'

const useDropDown = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const ref = React.useRef(null)

  const close = () => {
    setIsOpen(false)
  }

  const open = () => {
    setIsOpen(true)
  }

  React.useEffect(() => {
    const handleGlobalMouseDown = ({ target }) => {
      const isContains = ref.current.contains(target)
      // const isTarget = ref.current === target
      if (!ref.current || isContains) {
        return;
      }
      close()
    }

    document.addEventListener('click', handleGlobalMouseDown);

    return () => {
      document.removeEventListener('click', handleGlobalMouseDown);
    };
  }, [close]);

  return [ref, isOpen, open, close]
}

export default useDropDown