var $ = require('jquery');

var View = require('./View');

function DOMView(model, scene) {
  this.$el = $('<div></div>');
  View.call(this, model, scene);
}

DOMView.prototype = Object.create(View.prototype);

DOMView.prototype.render = function() {
  this.$el.empty();
};

module.exports = DOMView;