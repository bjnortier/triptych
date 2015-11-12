'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = require('three');

var View = require('./View');
var ThreeJSViewControllerMixin = require('./mixins/ThreeJSViewControllerMixin');

var ThreeJSView = (function (_View) {
  _inherits(ThreeJSView, _View);

  function ThreeJSView(model, scene, options) {
    _classCallCheck(this, ThreeJSView);

    _get(Object.getPrototypeOf(ThreeJSView.prototype), 'constructor', this).call(this, model, scene, options);

    options = options || {};
    this.sceneObject = new THREE.Object3D();
    this.layer = options.layer || 0;
    scene.add(this);
    this.controllerMixin = ThreeJSViewControllerMixin;

    var _this = this;

    function RelayListener(type) {
      var listener = function listener(event, closest) {
        if (closest.view === _this) {
          event.viewClicked = true;
          _this.emit(type, event, closest.position);
        }
      };
      this.remove = function () {
        _this.off(type, listener);
      };
      scene.viewEventGenerator.on(type, listener);
    }

    // Relay the events via the view
    this.eventListeners = [];
    this.eventListeners.push(new RelayListener('click'));
    this.eventListeners.push(new RelayListener('mouseenter'));
    this.eventListeners.push(new RelayListener('mouseover'));
    this.eventListeners.push(new RelayListener('mouseleave'));
  }

  _createClass(ThreeJSView, [{
    key: 'remove',
    value: function remove() {
      _get(Object.getPrototypeOf(ThreeJSView.prototype), 'remove', this).call(this);
      this.scene.remove(this);
      // subsequent operations on the scene object should result in an error
      this.sceneObject = undefined;
      this.scene.redraw();

      this.eventListeners.forEach(function (listener) {
        listener.remove();
      });
      this.eventListeners = [];
    }
  }, {
    key: 'render',
    value: function render() {
      this.clear();
      this.scene.redraw();
    }
  }, {
    key: 'update',
    value: function update() {
      this.scene.redraw();
    }
  }, {
    key: 'clear',
    value: function clear() {
      var children = this.sceneObject.children.slice(0);
      children.forEach(function (child) {
        this.sceneObject.remove(child);
      }, this);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.scene.remove(this);
      this.hidden = true;
      this.scene.redraw();
    }
  }, {
    key: 'show',
    value: function show() {
      this.scene.add(this);
      this.hidden = false;
      this.scene.redraw();
    }
  }]);

  return ThreeJSView;
})(View);

module.exports = ThreeJSView;