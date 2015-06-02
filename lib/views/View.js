var ee = require('event-emitter');

function View(model, scene) {
  this.model = model;
  this.scene = scene;

  ee(this);
  
  // Respond to model 'change' events using the correct
  // 'this' object which references the view
  var _this = this;
  model.on('change', function() {
    _this.emit('pre_update');
    _this.update.apply(_this, arguments);
    _this.emit('post_update');
  });

  // Event emitting for the render cycle doesn't
  // reallly work, since render() is done as part of
  // the view construction. Any potential listeners
  // can do pre/post functions before/after
  this.render();
}

module.exports = View;