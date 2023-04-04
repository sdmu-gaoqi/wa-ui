const useCss = (cssMaps = {}): string => {
    let classStr = ''
    for(let i in cssMaps) {
        if(cssMaps[i]) {
            classStr += ` ${i}`
        }
    }
    return classStr
}

export default useCss