import _ from 'lodash';
import { cssPixel } from '../constants/constants';

export const getShouldTransfer = (element: any) => {
  return new Promise((resolve, reject) => {
    if (_.isEmpty(element)) {
      resolve(false);
    } else {
      let clientWidth = _.get(element, 'clientWidth', 0);
      let scrollWidth = _.get(element, 'scrollWidth', 0);
      resolve(scrollWidth > clientWidth);
    }
  });
};

export const handleTransfer = ({ element, type }: any) => {
  if (_.isEmpty(element)) {
    return;
  }
  if (_.isEmpty(type)) {
    throw TypeError('type is empty');
  }
  let timeNum = 50;
  const clear = () => {
    clearInterval(scroll);
    timeNum = 50;
  };
  const scroll = setInterval(() => {
    timeNum--;
    if (timeNum === 1) {
      clear();
    } else {
      const currentLeft = +element.style.left?.split('px')[0] || 0;
      let { clientWidth, scrollWidth } = element;
      if (scrollWidth + currentLeft <= clientWidth && type === 'right') {
        clear();
        return;
      }
      if (currentLeft >= 0 && type === 'left') {
        clear();
        return;
      }
      let num = type === 'left' ? 1 : -1;
      element.style.left = `${currentLeft + num}px`;
    }
  }, 0);
};

export const concatCss = (value: string | string[], other = ''): string => {
  if (Array.isArray(value)) {
    const concatClass = value.map(item => `${cssPixel}${item}`).join(` `);
    return `${concatClass} ${other}`;
  }
  return `${cssPixel}${value} ${other}`;
};

export const getElementPosition = (element: HTMLElement | null): DOMRect => {
  if(!element) {
    throw new TypeError('element must be')
  }
  const position = element.getBoundingClientRect()
  return position
}