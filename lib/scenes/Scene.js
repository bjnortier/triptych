var EventGenerator = require('../events/EventGenerator');

function Scene($container) {
  this.$container = $container;
  this.eventGenerator = new EventGenerator($container);
}

module.exports = Scene;