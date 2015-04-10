var SVG;

function SVGScene($container) {
  // Sadly SVG.js doesn't play nice with require()
  if (SVG === undefined) {
    SVG = require('svg.js');
  }
  this.draw = SVG($container[0]);
}

module.exports = SVGScene;