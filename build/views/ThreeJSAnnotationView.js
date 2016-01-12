'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = require('three');

var DOMView = require('./DOMView');

function toScreenCoordinates(width, height, camera, worldCoordinates) {
  worldCoordinates = worldCoordinates.clone();
  var projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  worldCoordinates.applyProjection(projScreenMat);
  return {
    x: width * ((worldCoordinates.x + 1) / 2),
    y: height * ((-worldCoordinates.y + 1) / 2)
  };
}

var ThreeJSAnnotationView = (function (_DOMView) {
  _inherits(ThreeJSAnnotationView, _DOMView);

  function ThreeJSAnnotationView(model, threeJSScene, position, options) {
    var _this = this;

    _classCallCheck(this, ThreeJSAnnotationView);

    options = options || {};
    if (options['class']) {
      options['class'] += ' annotation';
    } else {
      options['class'] = 'annotation';
    }
    options.style = 'position: absolute;';
    _get(Object.getPrototypeOf(ThreeJSAnnotationView.prototype), 'constructor', this).call(this, model, threeJSScene, options);
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.$container = threeJSScene.$container;
    this.align = options.align || {};

    threeJSScene.on('render', function (camera) {
      _this.updatePosition(camera);
    });
    setTimeout(this.updatePosition.bind(this, threeJSScene.camera));
  }

  _createClass(ThreeJSAnnotationView, [{
    key: 'render',
    value: function render() {
      _get(Object.getPrototypeOf(ThreeJSAnnotationView.prototype), 'render', this).call(this);
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(camera) {
      var coords = toScreenCoordinates(this.$container.width(), this.$container.height(), camera, this.position);
      var width = this.$el.outerWidth();
      var height = this.$el.outerHeight();
      var offsetX = 0;
      var offsetY = 0;
      if (this.align.centerX) {
        offsetX = -width / 2;
      }
      if (this.align.centerY) {
        offsetY = -height / 2;
      }
      if (this.align.right) {
        offsetX = -width;
      }
      if (this.align.bottom) {
        offsetY = -height;
      }
      this.$el.css({
        left: coords.x + offsetX + 'px',
        top: coords.y + offsetY + 'px'
      });
    }
  }]);

  return ThreeJSAnnotationView;
})(DOMView);

module.exports = ThreeJSAnnotationView;