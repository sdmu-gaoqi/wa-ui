import React, { useEffect, useState } from 'react'

export const RegExps = {
  emoji: /[\u{1F000}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F910}-\u{1F93A}\u{1F950}-\u{1F970}\u{1F980}-\u{1F9E0}]/ug,
  email: /^[A-Za-z0-9!#$%&'*+\/=?^_{|.}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/,
}

interface UseRegExpProps {
  type: keyof typeof RegExps
  value: string
}

const useRegExp = (props: UseRegExpProps) => {
  const { type, value } = props
  const regExp = new RegExp(RegExps?.[type])
  const [isValid, setIsvalid] = useState(false)
  useEffect(() => {
    setIsvalid(regExp.test(value))
  }, [value])
  return [
    isValid
  ]
}

export default useRegExp