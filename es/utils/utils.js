import _ from 'lodash';
export const getShouldTransfer = element => {
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
export const handleTransfer = ({
  element,
  type
}) => {
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
      var _element$style$left;

      const currentLeft = +((_element$style$left = element.style.left) === null || _element$style$left === void 0 ? void 0 : _element$style$left.split('px')[0]) || 0;
      let clientWidth = element.clientWidth,
          scrollWidth = element.scrollWidth;

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