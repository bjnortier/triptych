var flow = require('../../../');
var Model = flow.Model;

function EventCaptureModel() {
  this.events = [];
  Model.call(this);
}

EventCaptureModel.prototype = Object.create(Model.prototype);

EventCaptureModel.prototype.addEvent = function(type, event, data) {
  this.events.push({type: type, event: event, data: data});
  if (this.events.length > 30) {
    this.events = this.events.slice(1);
  }
  this.emitChange();
};

module.exports = EventCaptureModel;