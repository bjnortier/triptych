var ee = require('event-emitter');

class Scene {

  constructor($container) {
    ee(this);
    this.$container = $container;
  }

}

module.exports = Scene;