var Scene = require('./Scene');

function DOMScene($container) {
  this.$container = $container;
  Scene.call(this, $container);
}

DOMScene.prototype = Object.create(Scene.prototype);

module.exports = DOMScene;
