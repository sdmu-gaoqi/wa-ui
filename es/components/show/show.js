import React from 'react';

var Show = function Show(props) {
  var show = props.show,
      children = props.children;
  return /*#__PURE__*/React.createElement(React.Fragment, null, show ? children : /*#__PURE__*/React.createElement(React.Fragment, null));
};

export default Show;