var flow = require('../../../');
var Model = flow.Model;

function EventCaptureModel() {
  this.events = [];
  Model.call(this);

  var _this = this;
  setInterval(function() {
    _this.addEvent({timestamp: new Date().getTime()});
  }, 1000);
}

EventCaptureModel.prototype = Object.create(Model.prototype);

EventCaptureModel.prototype.addEvent = function(event) {
  this.events.push(event);
  if (this.events.length > 10) {
    this.events = this.events.slice(1);
  }
  this.emitChange();
};

module.exports = EventCaptureModel;