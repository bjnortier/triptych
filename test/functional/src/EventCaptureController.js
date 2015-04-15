var flow = require('../../../');
var Controller = flow.Controller;

function EventCaptureController(model, scene, cube1, cube2) {
  Controller.call(this, model);
  var _this = this;
  // scene.eventGenerator.on('click', function(event, position) {
  //   _this.model.addEvent('raw click', event, position);
  // });
  // scene.eventGenerator.on('mousemove', function(event, position) {
  //   _this.model.addEvent('raw mousemove', event, position);
  // });
  // scene.viewEventGenerator.on('click', function(event, closest) {
  //   _this.model.addEvent('view click', event, closest);
  // });

  cube1.on('click', function(event, position) {
    _this.model.addEvent('cube1 click', event, {position: position});
  });

  cube2.on('click', function(event, position) {
    _this.model.addEvent('cube2 click', event, {position: position});
  });
}

EventCaptureController.prototype = Object.create(Controller.prototype);

module.exports = EventCaptureController;