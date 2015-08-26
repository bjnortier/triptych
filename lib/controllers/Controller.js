var ee = require('event-emitter');

class Controller {

  constructor(model) {
    ee(this);
    this.model = model;
    this.views = [];
  }

  addView(scene, ViewConstructor, options) {
    var view = new ViewConstructor(this.model, scene, options);
    view.on('post_render', () => {
      view.controllerMixin.call(this, view);
    });
    this.views.push(view);
    return view;
  }
}

module.exports = Controller;