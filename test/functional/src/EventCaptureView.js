var flow = require('../../../');
var mustache = flow.mustache;
var DOMView = flow.views.DOMView;

function EventCaptureView(model, scene) {
  DOMView.call(this, model, scene);
}

EventCaptureView.prototype = Object.create(DOMView.prototype);

EventCaptureView.prototype.render = function() {
  DOMView.prototype.render.call(this);
  var template = '{{#events}}<div class="event">{{.}}</div>{{/events}}';
  var reversed = this.model.events.slice(0);
  reversed.reverse();
  this.$el.html(mustache.render(template, {
    events: reversed.map(function(e) {
      return JSON.stringify(e);
    })
  }));
};

EventCaptureView.prototype.onChange = function() {
  this.render();
};

module.exports = EventCaptureView;