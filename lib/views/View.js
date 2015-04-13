function View(model, scene) {
  this.model = model;
  this.scene = scene;
  
  // Respond to model 'change' events using the correct
  // 'this' object which references the view
  var _this = this;
  model.on('change', function() {
    _this.onChange.apply(_this, arguments);
  });

  this.render();
}

module.exports = View;