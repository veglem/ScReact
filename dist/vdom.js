"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createText = exports.createElement = exports.createComponent = void 0;
var createElement = exports.createElement = function createElement(tagname, props) {
  var key = props.key;
  delete props.key;
  for (var _len = arguments.length, childeren = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childeren[_key - 2] = arguments[_key];
  }
  return {
    kind: 'element',
    tagname: tagname,
    props: props,
    childeren: childeren,
    key: key
  };
};
var createComponent = exports.createComponent = function createComponent(component, props) {
  var key = props.key;
  delete props.key;
  return {
    component: component,
    props: props,
    key: key,
    kind: 'component'
  };
};
var createText = exports.createText = function createText(value) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return {
    key: key,
    kind: 'text',
    value: value.toString()
  };
};
//# sourceMappingURL=vdom.js.map