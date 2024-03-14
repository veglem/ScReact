"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderDOM = exports.applyUpdate = void 0;
var renderElement = function renderElement(rootNode) {
  if (rootNode.kind == 'text') {
    return document.createTextNode(rootNode.value);
  }
  if (rootNode.kind == 'component') {
    if (rootNode.instance) {
      var _elem = renderElement(rootNode.instance.render());
      rootNode.instance.notifyMounted(_elem);
      return _elem;
    }
    rootNode.instance = new rootNode.component();
    var _elem2 = renderElement(rootNode.instance.initProps(rootNode.props));
    rootNode.instance.notifyMounted(_elem2);
    return _elem2;
  }
  var elem = document.createElement(rootNode.tagname);
  for (var att in rootNode.props || {}) {
    elem[att] = rootNode.props[att];
  }
  (rootNode.childeren || []).forEach(function (child) {
    return elem.appendChild(renderElement(child));
  });
  return elem;
};
var applyUpdate = exports.applyUpdate = function applyUpdate(elem, diff) {
  if (diff.kind == 'skip') return elem;
  if (diff.kind == 'replace') {
    var newElem = renderElement(diff.newNode);
    elem.replaceWith(newElem);
    if (diff.callback) diff.callback(newElem);
    return newElem;
  }
  if ('wholeText' in elem) throw new Error('invalid update for Text node');
  for (var att in diff.attributes.remove) {
    elem.removeAttribute(att);
  }
  for (var _att in diff.attributes.set) {
    elem[_att] = diff.attributes.set[_att];
  }
  applyChildrenDiff(elem, diff.childeren);
  return elem;
};
var applyChildrenDiff = function applyChildrenDiff(elem, operations) {
  var offset = 0;
  for (var i = 0; i < operations.length; i++) {
    var childUpdater = operations[i];
    if (childUpdater.kind == 'skip') continue;
    if (childUpdater.kind == 'insert') {
      if (elem.childNodes[i + offset - 1]) elem.childNodes[i + offset - 1].after(renderElement(childUpdater.node));else elem.appendChild(renderElement(childUpdater.node));
      continue;
    }
    var childElem = elem.childNodes[i + offset];
    if (childUpdater.kind == 'remove') {
      childElem.remove();
      offset -= 1;
      continue;
    }
    applyUpdate(childElem, childUpdater);
  }
};
var renderDOM = exports.renderDOM = function renderDOM(htmlId, rootNode) {
  var elem = document.getElementById(htmlId);
  if (elem == null) {
    throw new Error('Container elem not found');
  }
  var parent = elem.parentElement;
  elem.replaceWith(renderElement(rootNode));
  return parent.children[0];
};
//# sourceMappingURL=render.js.map