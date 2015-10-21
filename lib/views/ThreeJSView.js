var THREE = require('three');

var View = require('./View');
var ThreeJSViewControllerMixin = require('./mixins/ThreeJSViewControllerMixin');

class ThreeJSView extends View {

  constructor(model, scene, options) {
    super(model, scene, options);

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

  remove() {
    super.remove();
    this.scene.remove(this);
    // subsequent operations on the scene object should result in an error
    this.sceneObject = undefined;
    this.scene.redraw();

    this.eventListeners.forEach(function (listener) {
      listener.remove();
    });
    this.eventListeners = [];
  }

  render() {
    this.clear();
    this.scene.redraw();
  }

  update() {
    this.scene.redraw();
  }

  clear() {
    var children = this.sceneObject.children.slice(0);
    children.forEach(function (child) {
      this.sceneObject.remove(child);
    }, this);
  }

  hide() {
    this.scene.remove(this);
    this.scene.redraw();
  }

  show() {
    this.scene.add(this);
    this.scene.redraw();
  }

}

module.exports = ThreeJSView;
