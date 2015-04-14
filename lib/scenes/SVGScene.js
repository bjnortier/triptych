var Scene = require('./Scene');

var SVG;

function SVGScene($container) {
  // Sadly SVG.js doesn't play nice with require()
  if (SVG === undefined) {
    SVG = require('svg.js');
  }
  this.draw = SVG($container[0]);
  Scene.call(this, $container);
}

SVGScene.prototype = Object.create(Scene.prototype);

module.exports = SVGScene;