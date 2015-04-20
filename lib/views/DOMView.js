var $ = require('jquery');
var mustache = require('mustache');

var View = require('./View');

function DOMView(model, scene, options) {
  var template = '<div {{#id}}id="{{.}}"{{/id}} {{#class}}class="{{.}}"{{/class}}></div>';
  this.$el = $(mustache.render(template, options));
  scene.$container.append(this.$el);
  View.call(this, model, scene);
  this.controllerMixin = require('./mixins/DOMViewControllerMixin');
}

DOMView.prototype = Object.create(View.prototype);

DOMView.prototype.render = function() {
  this.$el.empty();
};

module.exports = DOMView;