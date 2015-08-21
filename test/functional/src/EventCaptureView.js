var flow = require('../../../');
var mustache = flow.mustache;
var DOMView = flow.views.DOMView;

class EventCaptureView extends DOMView {

  constructor(model, scene) {
    super(model, scene);
  }

  render() {
    super.render();
    var template = 
      '{{#events}}' +
        '<div class="event">' +
          '<div class="type">{{type}}</div>' +
          '{{#position}}' + 
            '{{#x}}<div class="x">{{.}}</div>{{/x}}' +
            '{{#y}}<div class="y">{{.}}</div>{{/y}}' +
            '{{#z}}<div class="z">{{.}}</div>{{/z}}' +
          '{{/position}}' +
        '</div>' + 
      '{{/events}}';
    var reversedEvents = this.model.events.slice(0);
    reversedEvents.reverse();
    reversedEvents = reversedEvents.map(function(eventStruct) {
      return {
        type: eventStruct.type,
        x: eventStruct.data.x,
        y: eventStruct.data.y,
        position: eventStruct.data.position,
      };
    });
    this.$el.html(mustache.render(template, {
      events: reversedEvents
    }));
  }

  update() {
    this.render();
  }

}

module.exports = EventCaptureView;