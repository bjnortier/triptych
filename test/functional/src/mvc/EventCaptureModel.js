var flow = require('../../../..');
var Model = flow.Model;

class EventCaptureModel extends Model {

  constructor() {
    super();
    this.events = [];
  }

  addEvent(type, event, data) {
    this.events.push({type: type, event: event, data: data});
    if (this.events.length > 30) {
      this.events = this.events.slice(1);
    }
    this.emitChange();
  }

}

module.exports = EventCaptureModel;