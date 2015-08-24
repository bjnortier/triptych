var Scene = require('./Scene');

var SVG;

class SVGScene extends Scene {

  constructor($container) {
    super($container);

    // Sadly SVG.js doesn't play nice with require()
    if (SVG === undefined) {
      SVG = require('svg.js');
    }
    this.draw = SVG($container[0]);
  }

}

module.exports = SVGScene;