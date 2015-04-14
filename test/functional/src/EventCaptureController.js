var flow = require('../../../');
var Controller = flow.Controller;

function EventCaptureController(model) {
  Controller.call(this, model);
}

EventCaptureController.prototype = Object.create(Controller.prototype);

module.exports = EventCaptureController;