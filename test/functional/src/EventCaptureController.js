var flow = require('../../../');
var Controller = flow.Controller;

function EventCaptureController(model, scene) {
  Controller.call(this, model);
  var _this = this;
  scene.eventGenerator.on('click', function(x, y, event) {
    _this.model.addEvent('click', x, y, event);
  });
  scene.eventGenerator.on('mousemove', function(x, y, event) {
    _this.model.addEvent('mousemove', x, y, event);
  });
}

EventCaptureController.prototype = Object.create(Controller.prototype);

module.exports = EventCaptureController;