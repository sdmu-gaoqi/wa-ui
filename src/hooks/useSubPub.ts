import React from 'react'

if(!window?.wa_global_sub_pub) {
  window.wa_global_sub_pub = {}
}

class globalState {
  private data = window?.wa_global_sub_pub
  onSub = (key, cb) => {
    const target = this.data?.[key]
    if(target) {
      target.push(key, cb)
    }
    else {
      this.data[key] = [cb]
    }
  }
  onPub = (key, val) => {
    const target = this.data?.[key]
    if(target?.length > 0) {
      target.forEach(item => {
        item(val)
      })
    }
  }
  offGlobalStateChange = () => {

  }
}

const useSubPub = () => {
  const ref = React.useRef<globalState>()
  if (!ref.current) {
    ref.current = new globalState()
  }
  return ref.current
}

export default useSubPub