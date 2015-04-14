function Controller(model) {
  this.model = model;
  this.views = [];
}

Controller.prototype.addView = function(model, scene, ViewConstructor) {
  var view = new ViewConstructor(model, scene);
  this.views.push(view);
};

module.exports = Controller;