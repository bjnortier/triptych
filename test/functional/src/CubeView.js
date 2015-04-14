var flow = require('../../..');
var THREE = flow.THREE;
var ThreeJSView = flow.views.ThreeJSView;

function CubeView(model, scene) {
  ThreeJSView.call(this, model, scene);
}

CubeView.prototype = Object.create(ThreeJSView.prototype);

CubeView.prototype.render = function() {
  this.sceneObject.add(new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshLambertMaterial({color: 0x6699ff})));
};

module.exports = CubeView;