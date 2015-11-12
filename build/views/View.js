'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ee = require('event-emitter');

var View = (function () {
  function View(model, scene) {
    _classCallCheck(this, View);

    this.model = model;
    this.scene = scene;
    ee(this);

    // Respond to model 'change' events using the correct
    // 'this' object which references the view
    var _this = this;
    this.changeFn = function () {
      _this.emit('pre_update');
      _this.update.apply(_this, arguments);
      _this.emit('post_update');
    };

    model.on('change', this.changeFn);

    // Render on next tick to ensure view
    // construction is complete
    setTimeout(function () {
      _this.emit('pre_render');
      _this.render();
      _this.emit('post_render');
    }, 0);
  }

  _createClass(View, [{
    key: 'remove',
    value: function remove() {
      this.model.off('change', this.changeFn);
    }
  }]);

  return View;
})();

module.exports = View;