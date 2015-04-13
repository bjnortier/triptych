var THREE = require('three');

var ThreeJSView = require('./ThreeJSView');

function AxesView(model, scene) {
  ThreeJSView.call(this, model, scene);
}

AxesView.prototype = Object.create(ThreeJSView.prototype);

AxesView.prototype.render = function() {
  var axes = [
    new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry(),
    new THREE.Geometry(), new THREE.Geometry(), new THREE.Geometry()
  ];

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

  this.sceneObject.add(new THREE.Line(axes[0],
      new THREE.LineBasicMaterial({ color: 0x0000ff })));
  this.sceneObject.add(new THREE.Line(axes[1],
      new THREE.LineBasicMaterial({ color: 0x00ff00 })));
  this.sceneObject.add(new THREE.Line(axes[2],
      new THREE.LineBasicMaterial({ color: 0xff0000 })));
  this.sceneObject.add(new THREE.Line(axes[3],
      new THREE.LineBasicMaterial({ color: 0x9999cc })));
  this.sceneObject.add(new THREE.Line(axes[4],
      new THREE.LineBasicMaterial({ color: 0x99cc99 })));
  this.sceneObject.add(new THREE.Line(axes[5],
      new THREE.LineBasicMaterial({ color: 0xcc9999 })));

};

module.exports = AxesView;