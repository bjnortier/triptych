var View = require('./View');

class SVGView extends View {

  constructor(scene, model) {
    super(model);
    this.group = scene.draw.group();
  }

  render() {
    this.group.clear();
  }

}

module.exports = SVGView;