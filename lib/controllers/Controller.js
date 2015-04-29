var ee = require('event-emitter');

function Controller(model) {
  ee(this);
  this.model = model;
  this.views = [];
}

Controller.prototype.addView = function(scene, ViewConstructor, options) {
  var view = new ViewConstructor(this.model, scene, options);
  view.controllerMixin.call(this, view);
  this.views.push(view);
  return view;
};

module.exports = Controller;