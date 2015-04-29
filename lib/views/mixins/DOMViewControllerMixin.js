
// Events are in the Backbone form of
// {
//   '[type] [selector]':'[function]'
// }
// where selector may have a space, e.g. 'foo > bar'
function DOMViewMixin(view) {
  var _this = this;
  var events = view.events || {};
  for (var key in events) {
    if (events.hasOwnProperty(key)) {
      var firstSpaceIndex = key.indexOf(' ');
      var type = key.substr(0, firstSpaceIndex);
      var selector = key.substr(firstSpaceIndex + 1);
      var fn = events[key];
      (function(fn) {
        view.$el.find(selector)[type](function(event) {
          if (_this[fn] === undefined) {
            throw new Error('mixin target has no function: ' + fn);
          }
          _this[fn](event);
        });
      })(fn);
    }
  }
}

module.exports = DOMViewMixin;

