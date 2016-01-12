var trip = require('../../../..');
var THREE = trip.THREE;
var ThreeJSView = trip.views.ThreeJSView;

class Rectangle extends ThreeJSView {

  constructor(model, scene, options) {
    super(model, scene);

    options = options || {};
    this.label = options.label;
    options.color = (options.color === undefined) ? 
      0x6666ff : options.color;
    options.position = (options.position === undefined) ? 
      {x: 0, y: 0, z: 0} : options.position;
    options.size = (options.size === undefined) ?
      1 : options.size;
    options.order = (options.order === undefined) ? 0 : options.order;
    this.options = options;
  }

  render() {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 1, 0));
    geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(0,2,3));
    geometry.computeFaceNormals();

    var material = new THREE.MeshLambertMaterial({
      color: this.options.color, 
      side: THREE.DoubleSide,
    });
    material.depthWrite = false;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(this.options.position);
    this.sceneObject.add(mesh);
  }

}

module.exports = Rectangle;