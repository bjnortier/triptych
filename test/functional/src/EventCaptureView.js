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
        '<div class="x">{{x}}</div>' +
        '<div class="y">{{y}}</div>' +
      '</div>' + 
    '{{/events}}';
  var reversedEvents = this.model.events.slice(0);
  reversedEvents.reverse();
  this.$el.html(mustache.render(template, {
    events: reversedEvents
  }));
};

EventCaptureView.prototype.onChange = function() {
  this.render();
};

module.exports = EventCaptureView;