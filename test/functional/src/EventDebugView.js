var flow = require('../../../');
var $ = flow.$;
var DOMView = flow.views.DOMView;

function EventDebugView(model, scene) {
  this.$el = $('<div>...</div>');
  scene.$container.append(this.$el);
  DOMView.call(this, model, scene);
}

EventDebugView.prototype = Object.create(DOMView.prototype);

EventDebugView.prototype.render = function() {
  DOMView.prototype.render.call(this);
  this.$el.html('event debug');
};

module.exports = EventDebugView;