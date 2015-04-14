var ContainerEventGenerator = require('../events/ContainerEventGenerator');

function Scene($container) {
  this.eventGenerator = new ContainerEventGenerator($container);
}

module.exports = Scene;