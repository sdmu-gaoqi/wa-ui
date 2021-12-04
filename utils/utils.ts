import _ from 'lodash'

export const getShouldTransfer = (element: any) => {
    return new Promise((resolve, reject) => {
        if(_.isEmpty(element)) {
            resolve(false)
        }
        else {
            let clientWidth = _.get(element, 'clientWidth', 0)
            let scrollWidth = _.get(element, 'scrollWidth', 0)
            resolve(scrollWidth > clientWidth)
        }
    })
}

export const handleTransfer = ({ element, type }: any) => {
    if(_.isEmpty(element)) {
        return
    }
    if(_.isEmpty(type)) {
        throw TypeError('type is empty')
    }
    let timeNum = 50
    const clear = () => {
        clearInterval(scroll)
        timeNum = 50
    }
    const scroll = setInterval(() => {
        timeNum--
        if(timeNum === 1) {
            clear()
        }
        else {
            const currentLeft = +element.style.left?.split('px')[0] || 0
            let { clientWidth, scrollWidth } = element
            if(scrollWidth + currentLeft <= clientWidth && type === 'right') {
                clear()
                return
            }
            if(currentLeft >= 0 && type === 'left') {
                clear()
                return
            }
            let num = type === 'left' ? 1 : -1
            element.style.left = `${currentLeft + num}px`
        }
    }, 0)
}