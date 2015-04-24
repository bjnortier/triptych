function Controller(model) {
  this.model = model;
  this.views = [];
}

Controller.prototype.addView = function(scene, ViewConstructor) {
  var view = new ViewConstructor(this.model, scene);
  view.controllerMixin.call(this, view);
  this.views.push(view);
  return view;
};

module.exports = Controller;