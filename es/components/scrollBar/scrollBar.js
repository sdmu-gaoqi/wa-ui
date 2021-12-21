function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React from 'react';
import styles from './scrollBar.less';
import _ from 'lodash';
import LeftIcon from './svg/left.svg';
import RightIcon from './svg/right.svg';
import Show from '../show/show';
import { getShouldTransfer, handleTransfer } from '../../utils/utils';

var ToButton = function ToButton(props) {
  var type = props.type,
      icons = props.icons,
      onClick = props.onClick;
  var imgLeft = LeftIcon;
  var imgRight = RightIcon;

  var handleClick = _.debounce(function () {
    onClick && onClick(type);
  }, 0);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Show, {
    show: type === 'left' && _.isEmpty(icons === null || icons === void 0 ? void 0 : icons[0])
  }, /*#__PURE__*/React.createElement("img", {
    src: imgLeft,
    className: styles.icons,
    onClick: handleClick
  })), /*#__PURE__*/React.createElement(Show, {
    show: type === 'right' && _.isEmpty(icons === null || icons === void 0 ? void 0 : icons[1])
  }, /*#__PURE__*/React.createElement("img", {
    src: imgRight,
    className: styles.icons,
    onClick: handleClick
  })), /*#__PURE__*/React.createElement(Show, {
    show: type === 'left' && !_.isEmpty(icons)
  }, !!(icons === null || icons === void 0 ? void 0 : icons[0]) && /*#__PURE__*/React.cloneElement(icons === null || icons === void 0 ? void 0 : icons[0], {
    className: styles.icons,
    onClick: handleClick
  })), /*#__PURE__*/React.createElement(Show, {
    show: type === 'right' && !_.isEmpty(icons)
  }, !!(icons === null || icons === void 0 ? void 0 : icons[1]) && /*#__PURE__*/React.cloneElement(icons === null || icons === void 0 ? void 0 : icons[1], {
    className: styles.icons,
    onClick: handleClick
  })));
};

var ScrollBar = function ScrollBar(props) {
  /**
   * @param {boolean} shouldShowIcon 是否展示移动按钮
   */
  var children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      width = props.width,
      icons = props.icons,
      wrapperStyle = props.wrapperStyle;

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      shouldShowIcon = _React$useState2[0],
      setShouldShowIcon = _React$useState2[1];

  var elementRef = React.useRef();
  var wrapperRef = React.useRef();
  React.useEffect(function () {
    getShouldTransfer(wrapperRef.current).then(function (res) {
      setShouldShowIcon(res);
    });
  }, []);
  var onClickToButton = React.useCallback(function (type) {
    handleTransfer({
      element: elementRef.current,
      type: type
    });
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.body,
    style: style
  }, /*#__PURE__*/React.createElement(Show, {
    show: shouldShowIcon
  }, /*#__PURE__*/React.createElement(ToButton, {
    icons: icons,
    type: "left",
    onClick: onClickToButton
  })), /*#__PURE__*/React.createElement("div", {
    ref: wrapperRef,
    className: styles.wrapper,
    style: _objectSpread({
      width: width
    }, wrapperStyle)
  }, /*#__PURE__*/React.createElement("div", {
    ref: elementRef,
    className: "".concat(styles.scrollBar, " scrollBar-wa")
  }, children)), /*#__PURE__*/React.createElement(Show, {
    show: shouldShowIcon
  }, /*#__PURE__*/React.createElement(ToButton, {
    icons: icons,
    type: "right",
    onClick: onClickToButton
  })));
};

export default ScrollBar;