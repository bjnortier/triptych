var ee = require('event-emitter');

// Add offset support to all browsers
function addOffset(element, event) {
  event.offsetX = Math.round((event.pageX - element.offset().left));
  event.offsetY = Math.round((event.pageY - element.offset().top));
  return event;
}

function ContainerEventGenerator($container) {
  ee(this);

  var _this = this;

  function createListener(type) {
    return function(event) {
      addOffset($container, event);
      _this.emit(type, event, {x: event.offsetX, y: event.offsetY});
    };
  }

  $container.on('click', createListener('click'));
  $container.on('mousemove', createListener('mousemove'));
}

module.exports = ContainerEventGenerator;