var View = require('../View');

function SVGView(scene, model) {
  this.draw = scene.draw;
  View.call(this, model);
}

SVGView.prototype = Object.create(View.prototype);

SVGView.prototype.onChange = function() {
  this.draw.clear();
};

module.exports = SVGView;