var SVG = require('svg.js');

function SVGScene($container) {
  this.draw = SVG($container[0]);
}

module.exports = SVGScene;