var isFunction = require('lodash.isfunction');

// Events are in the Backbone form of
// {
//   '[type] [selector]':'[function]'
//   '[type]'           :'[function]'
// }
// where selector may have a space, e.g. 'foo > bar'
function DOMViewControllerMixin(view) {
  
  var _this = this;

  function attachEvents() {

    // Events can be an object or a function that returns an object
    var events;
    if (isFunction(view.events)) {
      events = view.events();
    } else {
      events = view.events || {};
    }

    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        var firstSpaceIndex = key.indexOf(' ');
        // Event on root element
        var type;
        var selector;
        if (firstSpaceIndex === -1) {
          type = key;
        } else {
          type = key.substr(0, firstSpaceIndex);
          selector = key.substr(firstSpaceIndex + 1);
        }
        var fn = events[key];
        (function(fn) {
          var elem = (selector === undefined) ? view.$el : view.$el.find(selector);
          if (!elem.length) {
            console.warn('no selector "' + selector + '" on view');
          }
          elem[type](function(event) {
            if (_this[fn] === undefined) {
              throw new Error('mixin target has no function: ' + fn);
            }
            _this[fn](event);
          });
        })(fn);
      }
    }
  }

  view.on('post_update', function() {
    attachEvents();
  });

  attachEvents();
}

module.exports = DOMViewControllerMixin;
