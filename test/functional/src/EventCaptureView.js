var flow = require('../../../');
var mustache = flow.mustache;
var DOMView = flow.views.DOMView;

function EventCaptureView(model, scene) {
  DOMView.call(this, model, scene);
}

EventCaptureView.prototype = Object.create(DOMView.prototype);

EventCaptureView.prototype.render = function() {
  DOMView.prototype.render.call(this);
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
};

EventCaptureView.prototype.update = function() {
  this.render();
};

module.exports = EventCaptureView;