"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDiff = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var skip = function skip() {
  return {
    kind: 'skip'
  };
};
var replace = function replace(newNode) {
  return {
    kind: 'replace',
    newNode: newNode
  };
};
var update = function update(attributes, childeren) {
  return {
    kind: 'update',
    attributes: attributes,
    childeren: childeren
  };
};
var remove = function remove() {
  return {
    kind: 'remove'
  };
};
var insert = function insert(node) {
  return {
    kind: 'insert',
    node: node
  };
};
var isEqual = function isEqual(val1, val2) {
  return false;
};
var createDiff = exports.createDiff = function createDiff(oldNode, newNode) {
  if (oldNode.kind == 'text' && newNode.kind == 'text' && oldNode.value == newNode.value) {
    return skip();
  }
  if (oldNode.kind == 'text' || newNode.kind == 'text') {
    return replace(newNode);
  }
  if (oldNode.kind == 'component' && newNode.kind == 'component' && oldNode.component == newNode.component && oldNode.instance) {
    newNode.instance = oldNode.instance;
    if (isEqual(oldNode.props, newNode.props)) return skip();
    return newNode.instance.setProps(newNode.props);
  }
  if (oldNode.kind == 'component') {
    oldNode.instance.unmount();
    oldNode.instance = null;
    return replace(newNode);
  }
  if (newNode.kind == 'component') {
    newNode.instance = new newNode.component();
    return {
      kind: 'replace',
      newNode: newNode.instance.initProps(newNode.props),
      callback: function callback(e) {
        return newNode.instance.notifyMounted(e);
      }
    };
  }
  if (oldNode.tagname != newNode.tagname) {
    return replace(newNode);
  }
  var attUpdater = {
    remove: Object.keys(oldNode.props || {}).filter(function (att) {
      return Object.keys(newNode).indexOf(att) == -1;
    }),
    set: Object.keys(newNode.props || {}).filter(function (att) {
      return oldNode.props[att] != newNode.props[att];
    }).reduce(function (upd, att) {
      return _objectSpread(_objectSpread({}, upd), {}, _defineProperty({}, att, newNode.props[att]));
    }, {})
  };
  var childsUpdater = childsDiff(oldNode.childeren || [], newNode.childeren || []);
  return update(attUpdater, childsUpdater);
};
var removeUntilkey = function removeUntilkey(operations, elems, key) {
  while (elems[0] && elems[0][0] != key) {
    if (elems[0][1].kind == 'component') {
      elems[0][1].instance.unmount();
      elems[0][1].instance = null;
    }
    operations.push(remove());
    elems.shift();
  }
};
var insertUntilKey = function insertUntilKey(operations, elems, key) {
  while (elems[0] && elems[0][0] != key) {
    operations.push(insert(elems.shift()[1]));
  }
};
var childsDiff = function childsDiff(oldChilds, newChilds) {
  var remainingOldChilds = oldChilds.map(function (c) {
    return [c.key, c];
  });
  var remainingNewChilds = newChilds.map(function (c) {
    return [c.key, c];
  });
  var operations = [];
  var _ref = remainingOldChilds.find(function (k) {
      return remainingNewChilds.map(function (k) {
        return k[0];
      }).indexOf(k[0]) != -1;
    }) || [null],
    _ref2 = _slicedToArray(_ref, 1),
    nextUpdateKey = _ref2[0];
  while (nextUpdateKey) {
    removeUntilkey(operations, remainingOldChilds, nextUpdateKey);
    insertUntilKey(operations, remainingNewChilds, nextUpdateKey);
    operations.push(createDiff(remainingOldChilds.shift()[1], remainingNewChilds.shift()[1]));
    var _ref3 = remainingOldChilds.find(function (k) {
      return remainingNewChilds.map(function (k) {
        return k[0];
      }).indexOf(k[0]) != -1;
    }) || [null];
    var _ref4 = _slicedToArray(_ref3, 1);
    nextUpdateKey = _ref4[0];
  }
  removeUntilkey(operations, remainingOldChilds, undefined);
  insertUntilKey(operations, remainingNewChilds, undefined);
  return operations;
};
//# sourceMappingURL=diffs.js.map