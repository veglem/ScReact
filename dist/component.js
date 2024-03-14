"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;
var _diffs = require("./diffs");
var _render = require("./render");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Component = exports.Component = function () {
  function Component() {
    _classCallCheck(this, Component);
  }
  _createClass(Component, [{
    key: "setState",
    value: function setState(updater) {
      if (this.mountedElement == undefined) throw new Error("you are updating an unmounted component");
      this.state = updater(this.state);
      (0, _render.applyUpdate)(this.mountedElement, this.getUpdateDiff());
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      if (this.mountedElement == null) throw new Error("You are setting the props of an inmounted component");
      this.state = this.componentWillRecieveProps(props, this.state);
      this.props = props;
      return this.getUpdateDiff();
    }
  }, {
    key: "initProps",
    value: function initProps(props) {
      this.props = props;
      this.currentRootNode = this.render();
      return this.currentRootNode;
    }
  }, {
    key: "getUpdateDiff",
    value: function getUpdateDiff() {
      var _this = this;
      var newRootNode = this.render();
      var diff = (0, _diffs.createDiff)(this.currentRootNode, newRootNode);
      if (diff.kind == 'replace') diff.callback = function (elem) {
        return _this.mountedElement = elem;
      };
      this.currentRootNode = newRootNode;
      setTimeout(function () {
        return _this.componentDidUpdate();
      });
      return diff;
    }
  }, {
    key: "notifyMounted",
    value: function notifyMounted(elem) {
      var _this2 = this;
      this.mountedElement = elem;
      setTimeout(function () {
        return _this2.componentDidMount();
      });
    }
  }, {
    key: "unmount",
    value: function unmount() {
      this.componentWillUnmount();
      this.mountedElement = null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillRecieveProps",
    value: function componentWillRecieveProps(props, state) {
      return state;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }]);
  return Component;
}();
//# sourceMappingURL=component.js.map