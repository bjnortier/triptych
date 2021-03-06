var trip = require('../../../..');
var THREE = trip.THREE;
var ThreeJSView = trip.views.ThreeJSView;

class CubeView extends ThreeJSView {

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
    this.options = options;
  }

  render() {
    var size = this.options.size;
    var mesh = new THREE.Mesh(
      new THREE.BoxGeometry(size,size,size),
      new THREE.MeshLambertMaterial({color: this.options.color}));
    mesh.position.copy(this.options.position);
    this.sceneObject.add(mesh);
  }

}

module.exports = CubeView;
