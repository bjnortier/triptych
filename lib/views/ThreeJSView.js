var THREE = require('three');

var View = require('./View');
var ThreeJSViewControllerMixin = require('./mixins/ThreeJSViewControllerMixin');

function ThreeJSView(model, scene, options) {
  options = options || {};
  this.sceneObject = new THREE.Object3D();
  this.layer = options.layer || 0;
  scene.add(this);
  View.call(this, model, scene);
  this.controllerMixin = ThreeJSViewControllerMixin;

  var _this = this;

  function RelayListener(type) {
    var listener = function(event, closest) {
      if (closest.view === _this) {
        _this.emit(type, event, closest.position);
      }
    };
    this.remove = function() {
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

ThreeJSView.prototype = Object.create(View.prototype);

ThreeJSView.prototype.remove = function() {
  this.scene.remove(this);
  // subsequent operations on the scene object should result in an error
  this.sceneObject = undefined; 
  this.scene.redraw();

  this.eventListeners.forEach(function(listener) {
    listener.remove();
  });
  this.eventListeners = [];
};

ThreeJSView.prototype.render = function() {
  this.clear();
  this.scene.redraw();
};

ThreeJSView.prototype.update = function() {
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
  this.scene.redraw();
};

ThreeJSView.prototype.show = function() {
  this.scene.add(this);
  this.scene.redraw();
};

module.exports = ThreeJSView;