var THREE = require('three');

var View = require('./View');

function ThreeJSView(model, scene) {
  this.sceneObject = new THREE.Object3D();
  scene.add(this);
  View.call(this, model, scene);

  var _this = this;

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

};

module.exports = ThreeJSView;