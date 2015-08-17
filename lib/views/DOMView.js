var $ = require('jquery');
var mustache = require('mustache');

var View = require('./View');
var DOMViewControllerMixin = require('./mixins/DOMViewControllerMixin');

function DOMView(model, scene, options) {
  options = options || {};
  options.tag  = options.tag || 'div';
  var template = '<{{tag}} ' +
    '{{#id}}id="{{.}}"{{/id}} ' +
    '{{#class}}class="{{.}}"{{/class}} ' +
    '{{#title}}title="{{.}}"{{/title}} ' +
    '></{{tag}}>';
  this.$el = $(mustache.render(template, options));
  scene.$container.append(this.$el);
  View.call(this, model, scene);
  this.controllerMixin = DOMViewControllerMixin;
}

DOMView.prototype = Object.create(View.prototype);

DOMView.prototype.remove = function() {
  this.$el.remove();
};

DOMView.prototype.render = function() {
  this.$el.empty();
};

DOMView.prototype.update = function() {
  console.warn('update not implemented');
};


module.exports = DOMView;