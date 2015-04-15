var THREE = require('three');

var View = require('./View');

function ThreeJSView(model, scene) {
  this.sceneObject = new THREE.Object3D();
  scene.add(this);
  View.call(this, model, scene);
}

ThreeJSView.prototype = Object.create(View.prototype);

ThreeJSView.prototype.render = function() {

};

module.exports = ThreeJSView;