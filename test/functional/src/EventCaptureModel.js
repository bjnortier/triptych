var flow = require('../../../');
var Model = flow.Model;

function EventCaptureModel() {
  this.events = [];
  Model.call(this);
}

EventCaptureModel.prototype = Object.create(Model.prototype);

EventCaptureModel.prototype.addEvent = function(type, x, y, event) {
  this.events.push({type: type, x: x, y: y, event: event});
  if (this.events.length > 30) {
    this.events = this.events.slice(1);
  }
  this.emitChange();
};

module.exports = EventCaptureModel;