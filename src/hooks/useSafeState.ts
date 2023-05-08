import React from 'react'

const useSafeState = (data) => {
  const safeState = React.useRef(data)
  const [state, setState] = React.useState(data)

  React.useLayoutEffect(() => {
    safeState.current = data
  }, data)

  return [state, setState, safeState.current]
}

export default useSafeState