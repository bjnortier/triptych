var $ = require('jquery');

var View = require('./View');

function DOMView(model, scene) {
  this.$el = $('<div></div>');
  scene.$container.append(this.$el);
  View.call(this, model, scene);
  this.controllerMixin = require('./mixins/DOMViewControllerMixin')
}

DOMView.prototype = Object.create(View.prototype);

DOMView.prototype.render = function() {
  this.$el.empty();
};

module.exports = DOMView;