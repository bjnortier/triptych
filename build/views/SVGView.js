'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DOMView = require('./DOMView');
var DOMViewControllerMixin = require('./mixins/DOMViewControllerMixin');

var SVG = undefined;

var SVGView = (function (_DOMView) {
  _inherits(SVGView, _DOMView);

  function SVGView(model, scene, options) {
    _classCallCheck(this, SVGView);

    _get(Object.getPrototypeOf(SVGView.prototype), 'constructor', this).call(this, model, scene, options);

    // Sadly SVG.js doesn't play nice with require()
    if (SVG === undefined) {
      SVG = require('svg.js');
    }
    var draw = SVG(this.$el[0]);
    this.group = draw.group();
    this.controllerMixin = DOMViewControllerMixin;
  }

  _createClass(SVGView, [{
    key: 'render',
    value: function render() {
      this.group.clear();
    }
  }, {
    key: 'update',
    value: function update() {
      this.render();
    }
  }]);

  return SVGView;
})(DOMView);

module.exports = SVGView;