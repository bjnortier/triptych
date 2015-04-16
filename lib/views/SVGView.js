var View = require('./View');

function SVGView(scene, model) {
  this.group = scene.draw.group();
  View.call(this, model);
}

SVGView.prototype = Object.create(View.prototype);

SVGView.prototype.render = function() {
  this.group.clear();
};

module.exports = SVGView;