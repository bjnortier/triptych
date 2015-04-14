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
  $container.on('click', function(event) {
    addOffset($container, event);
    _this.emit('click', 
      event.offsetX, 
      event.offsetY,
      event);
  });
}

module.exports = ContainerEventGenerator;