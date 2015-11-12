var ee = require('event-emitter');
var $ = require('jquery');

// Add offset support to all browsers
function addOffset(element, event) {
  event.offsetX = Math.round((event.pageX - element.offset().left));
  event.offsetY = Math.round((event.pageY - element.offset().top));
  return event;
}

function eventToPosition(event) {
  return {
    x: event.offsetX,
    y: event.offsetY,
  };
}

var DRAG_THRESHOLD = 8; // px, radius

function overDragThreshold(pos2, mouseDownEvent) {
  var pos1 = eventToPosition(mouseDownEvent);
  var dx = Math.abs(pos1.x - pos2.x);
  var dy = Math.abs(pos1.y - pos2.y);
  return Math.sqrt(dx*dx + dy*dy) > DRAG_THRESHOLD;
}

class ContainerEventGenerator {

  constructor($container) {
    ee(this);
    var _this = this;

    var dragging = false;
    var mouseDownEvent;

    // Can't use jQuery's 'click' event, as we don't want to
    // emit a 'click' when dragging
    $container.bind('mousedown', function(event) {
      addOffset($container, event);
      mouseDownEvent = event;
    });

    $container.on('mousemove', function(event) {
      addOffset($container, event);
      if (mouseDownEvent &&
          !dragging &&
          overDragThreshold(eventToPosition(event), mouseDownEvent)) {
        if (!dragging) {
          _this.emit('startdrag', mouseDownEvent);
        }
        dragging = true;
      }
      if (dragging) {
        _this.emit('drag', event, eventToPosition(event), eventToPosition(mouseDownEvent));
      } else {
        _this.emit('mousemove', event, eventToPosition(event));
      }
    });

    $container.on('mouseup', function(event) {
      // When the mouse up is on a different container, ignore it
      if (mouseDownEvent) {
        addOffset($container, event);
        if (!dragging) {
          _this.emit('click', event, eventToPosition(mouseDownEvent));
        }
        if (dragging) {
          dragging = false;
          _this.emit('stopdrag', event, eventToPosition(event));
        }
        mouseDownEvent = undefined;
      }
    });

    $(document).on('keyup', function(event) {
      _this.emit('keyup', event);
    });

  }

}

module.exports = ContainerEventGenerator;
