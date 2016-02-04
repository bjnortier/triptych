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
    if (options.class) {
      options.class += ' annotation';
    } else {
      options.class = 'annotation';
    }
    options.style = 'position: absolute;';
    super(model, threeJSScene, options);
    this.position = new THREE.Vector3(position.x, position.y, position.z);
    this.$container = threeJSScene.$container;
    this.align = options.align || {};

    this.onRender = (camera) => {
      this.updatePosition(camera);
    };

    threeJSScene.on('render', this.onRender);
    setTimeout(this.updatePosition.bind(this, threeJSScene.camera));
  }

  remove() {
    super.remove();
    this.scene.off('render', this.onRender);
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
    var width = this.$el.outerWidth();
    var height = this.$el.outerHeight();
    var offsetX = 0;
    var offsetY = 0;
    if (this.align.centerX) {
      offsetX = -width/2;
    }
    if (this.align.centerY) {
      offsetY = -height/2;
    }
    if (this.align.right) {
      offsetX = -width;
    }
    if (this.align.bottom) {
      offsetY = -height;
    }
    this.$el.css({
      left: coords.x + offsetX + 'px',
      top: coords.y + offsetY + 'px',
    });
  }

}

module.exports = ThreeJSAnnotationView;
