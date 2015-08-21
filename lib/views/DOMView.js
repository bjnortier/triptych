'use strict';

var $ = require('jquery');
var mustache = require('mustache');

var View = require('./View');
var DOMViewControllerMixin = require('./mixins/DOMViewControllerMixin');

class DOMView extends View {

  constructor(model, scene, options) {
    super(model, scene);
    
    options = options || {};
    options.tag = options.tag || 'div';
    var template = '<{{tag}} ' + 
      '{{#id}}id="{{.}}"{{/id}} ' + 
      '{{#class}}class="{{.}}"{{/class}} ' +
      '{{#title}}title="{{.}}"{{/title}} ' +
      '></{{tag}}>';
    this.$el = $(mustache.render(template, options));
    scene.$container.append(this.$el);
    this.controllerMixin = DOMViewControllerMixin;
  }

  remove() {
    this.$el.remove();
  }

  render() {
    this.$el.empty();
  }

  update() {
    console.warn('update not implemented');
  }

}

module.exports = DOMView;