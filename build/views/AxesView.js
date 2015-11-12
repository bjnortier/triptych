'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = require('three');

var ThreeJSView = require('./ThreeJSView');

var AxesView = (function (_ThreeJSView) {
  _inherits(AxesView, _ThreeJSView);

  function AxesView(model, scene) {
    _classCallCheck(this, AxesView);

    _get(Object.getPrototypeOf(AxesView.prototype), 'constructor', this).call(this, model, scene);
  }

  _createClass(AxesView, [{
    key: 'render',
    value: function render() {
      var axes = [new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry()];

      axes[0].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[0].vertices.push(new THREE.Vector3(10000, 0, 0));
      axes[1].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[1].vertices.push(new THREE.Vector3(0, 10000, 0));
      axes[2].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[2].vertices.push(new THREE.Vector3(0, 0, 10000));
      axes[3].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[3].vertices.push(new THREE.Vector3(-10000, 0, 0));
      axes[4].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[4].vertices.push(new THREE.Vector3(0, -10000, 0));
      axes[5].vertices.push(new THREE.Vector3(0, 0, 0));
      axes[5].vertices.push(new THREE.Vector3(0, 0, -10000));

      this.sceneObject.add(new THREE.Line(axes[0], new THREE.LineBasicMaterial({ color: 0x0000ff })));
      this.sceneObject.add(new THREE.Line(axes[1], new THREE.LineBasicMaterial({ color: 0x00ff00 })));
      this.sceneObject.add(new THREE.Line(axes[2], new THREE.LineBasicMaterial({ color: 0xff0000 })));
      this.sceneObject.add(new THREE.Line(axes[3], new THREE.LineBasicMaterial({ color: 0xaaaacc })));
      this.sceneObject.add(new THREE.Line(axes[4], new THREE.LineBasicMaterial({ color: 0xaaccaa })));
      this.sceneObject.add(new THREE.Line(axes[5], new THREE.LineBasicMaterial({ color: 0xccaaaa })));
    }
  }]);

  return AxesView;
})(ThreeJSView);

module.exports = AxesView;