const DOMView = require('./DOMView');
const DOMViewControllerMixin = require('./mixins/DOMViewControllerMixin');

let SVG;

class SVGView extends DOMView {

  constructor(model, scene, options) {
    super(model, scene, options);

    // Sadly SVG.js doesn't play nice with require()
    if (SVG === undefined) {
      SVG = require('svg.js');
    }
    let draw = SVG(this.$el[0]);
    this.group = draw.group();
    this.controllerMixin = DOMViewControllerMixin;
  }

  render() {
    this.group.clear();
  }

  update() {
    this.render();
  }

}

module.exports = SVGView;
