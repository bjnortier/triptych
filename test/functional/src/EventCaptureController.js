var flow = require('../../../');
var $ = flow.$;
var DOMScene = flow.scenes.DOMScene;
var Controller = flow.Controller;

var EventCaptureModel = require('./EventCaptureModel');
var EventCaptureView = require('./EventCaptureView');

function EventCaptureController(cube1, cube2) {
  Controller.call(this, new EventCaptureModel());

  var domScene = new DOMScene($('#dom'));
  this.addView(domScene, EventCaptureView);

  var _this = this;
  function addListener(view, label, type) {
    view.on(type, function(event, position) {
      _this.model.addEvent(label + ':' + type, event, {position: position});
    });
  }

  addListener(cube1, '1', 'click');
  addListener(cube1, '1', 'mouseenter');
  addListener(cube1, '1', 'mouseover');
  addListener(cube1, '1', 'mouseleave');
  addListener(cube2, '2', 'click');
  addListener(cube2, '2', 'mouseenter');
  addListener(cube2, '2', 'mouseover');
  addListener(cube2, '2', 'mouseleave');
}

EventCaptureController.prototype = Object.create(Controller.prototype);

module.exports = EventCaptureController;