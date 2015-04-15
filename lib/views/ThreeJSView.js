var THREE = require('three');

var View = require('./View');

function ThreeJSView(model, scene) {
  this.sceneObject = new THREE.Object3D();
  scene.add(this);
  View.call(this, model, scene);

  var _this = this;
  scene.viewEventGenerator.on('click', function(event, closest) {
    if (closest.view === _this) {
      _this.emit('click', event, closest.position);
    }
  }); 
}

ThreeJSView.prototype = Object.create(View.prototype);

ThreeJSView.prototype.render = function() {

};

module.exports = ThreeJSView;