'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuid = require('uuid');
var isObject = require('lodash.isobject');
var isArray = require('lodash.isarray');
var keys = require('lodash.keys');
var $ = require('jquery');
var mustache = require('mustache');

var View = require('./View');
var DOMViewControllerMixin = require('./mixins/DOMViewControllerMixin');
var DOMBinding = require('../bindings/dom/DOMBinding');

var DOMView = (function (_View) {
  _inherits(DOMView, _View);

  function DOMView(model, scene, options) {
    _classCallCheck(this, DOMView);

    _get(Object.getPrototypeOf(DOMView.prototype), 'constructor', this).call(this, model, scene);

    options = options || {};
    options.tag = options.tag || 'div';
    if (options.draggable) {
      options.draggable = 'true';
    }
    var template = '<{{tag}} ' + '{{#id}}id="{{.}}"{{/id}} ' + '{{#class}}class="{{.}}"{{/class}} ' + '{{#title}}title="{{.}}"{{/title}} ' + '{{#style}}style="{{.}}"{{/style}} ' + '{{#draggable}}draggable="{{.}}"{{/draggable}} ' + '></{{tag}}>';
    this.$el = $(mustache.render(template, options));
    scene.$container.append(this.$el);
    this.controllerMixin = DOMViewControllerMixin;
  }

  _createClass(DOMView, [{
    key: 'remove',
    value: function remove() {
      _get(Object.getPrototypeOf(DOMView.prototype), 'remove', this).call(this);
      this.$el.remove();
    }
  }, {
    key: 'render',
    value: function render() {
      this.$el.empty();
    }
  }, {
    key: 'update',
    value: function update() {
      console.warn('update not implemented for DOMView');
    }
  }, {
    key: 'toHtml',
    value: function toHtml(template, view) {
      var _this = this;

      var placeHolders = {};

      function replaceBindings(x) {
        if (isArray(x)) {
          x.forEach(function (y, i) {
            if (y instanceof DOMBinding) {
              var id = '__' + uuid.v4() + '__';
              x[i] = '<div class="placeholder" id="' + id + '"></div>';
              placeHolders[id] = y;
            } else {
              replaceBindings(y);
            }
          });
        } else if (isObject(x)) {
          keys(view).forEach(function (key) {
            var val = x[key];
            if (val instanceof DOMBinding) {
              var id = '__' + uuid.v4() + '__';
              view[key] = '<div class="placeholder" id="' + id + '"></div>';
              placeHolders[id] = val;
            } else {
              replaceBindings(val);
            }
          });
        }
      }

      // Replace binding with placeholder HTML elements
      replaceBindings(view);

      this.$el.html(mustache.render(template, view));

      // Re-insert the binding into the placeholders
      keys(placeHolders).forEach(function (id) {
        _this.$el.find('.placeholder#' + id).replaceWith(placeHolders[id].$el);
      }, this);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.$el.remove();
      this.hidden = true;
    }
  }, {
    key: 'show',
    value: function show() {
      this.scene.$container.append(this.$el);
      this.hidden = false;
    }
  }]);

  return DOMView;
})(View);

module.exports = DOMView;