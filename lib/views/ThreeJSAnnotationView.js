var THREE = require('three');

var DOMView = require('./DOMView');

function toScreenCoordinates(width, height, camera, worldCoordinates) {
  worldCoordinates = worldCoordinates.clone();
  var projScreenMat = new THREE.Matrix4();
  projScreenMat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  worldCoordinates.applyProjection(projScreenMat);
  return {
    x: width * ((worldCoordinates.x+1)/2),
    y: height * ((-worldCoordinates.y+1)/2)
  };
}

class ThreeJSAnnotationView extends DOMView {

  constructor(model, threeJSScene, position, options) {
    options = options || {};
    options.style = "position: absolute;";
    super(model, threeJSScene, options);
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.$container = threeJSScene.$container;

    threeJSScene.on('render', (camera) => {
      this.updatePosition(camera);
    });
    setTimeout(this.updatePosition.bind(this, threeJSScene.camera));
  }

  render() {
    super.render();
  }

  updatePosition(camera) {
    var coords = toScreenCoordinates(
      this.$container.width(),
      this.$container.height(),
      camera,
      this.position);
    this.$el.css({
      left: coords.x + 'px', 
      top: coords.y + 'px',
    });
  }

}

module.exports = ThreeJSAnnotationView;