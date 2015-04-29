var ee = require('event-emitter');

function View(model, scene) {
  this.model = model;
  this.scene = scene;

  ee(this);
  
  // Respond to model 'change' events using the correct
  // 'this' object which references the view
  var _this = this;
  model.on('change', function() {
    _this.update.apply(_this, arguments);
  });

  this.render();
}

module.exports = View;