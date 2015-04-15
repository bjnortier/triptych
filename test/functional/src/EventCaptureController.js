var flow = require('../../../');
var Controller = flow.Controller;

function EventCaptureController(model, scene) {
  Controller.call(this, model);
  var _this = this;
  // scene.eventGenerator.on('click', function(event, position) {
  //   _this.model.addEvent('raw click', event, position);
  // });
  // scene.eventGenerator.on('mousemove', function(event, position) {
  //   _this.model.addEvent('raw mousemove', event, position);
  // });
  scene.viewEventGenerator.on('click', function(event, closest) {
    _this.model.addEvent('view click', event, closest);
  });
}

EventCaptureController.prototype = Object.create(Controller.prototype);

module.exports = EventCaptureController;