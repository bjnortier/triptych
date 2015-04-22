var THREE = require('three');

var View = require('./View');
var ThreeJSViewControllerMixin = require('./mixins/ThreeJSViewControllerMixin');

function ThreeJSView(model, scene) {
  this.sceneObject = new THREE.Object3D();
  scene.add(this);
  View.call(this, model, scene);

  var _this = this;

  this.controllerMixin = ThreeJSViewControllerMixin;

  function addRelayListener(type) {
    scene.viewEventGenerator.on(type, function(event, closest) {
      if (closest.view === _this) {
        _this.emit(type, event, closest.position);
      }
    }); 
  }

  // Relay the events via the view
  addRelayListener('click');
  addRelayListener('mouseenter');
  addRelayListener('mouseover');
  addRelayListener('mouseleave');

}

ThreeJSView.prototype = Object.create(View.prototype);

ThreeJSView.prototype.render = function() {
  this.scene.redraw();
};

ThreeJSView.prototype.update = function() {
  this.clear();
  this.scene.redraw();
};

ThreeJSView.prototype.clear = function() {
  var children = this.sceneObject.children.slice(0);
  children.forEach(function(child) {
    this.sceneObject.remove(child);
  }, this);
};

ThreeJSView.prototype.hide = function() {
  this.scene.remove(this);
};

ThreeJSView.prototype.show = function() {
  this.scene.add(this);
};

module.exports = ThreeJSView;