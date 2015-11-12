'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ee = require('event-emitter');

var Controller = (function () {
  function Controller(model) {
    _classCallCheck(this, Controller);

    ee(this);
    this.model = model;
    this.views = [];
  }

  _createClass(Controller, [{
    key: 'addView',
    value: function addView(scene, ViewConstructor, options) {
      var _this = this;

      var view = new ViewConstructor(this.model, scene, options);
      view.on('post_render', function () {
        view.controllerMixin.call(_this, view);
      });
      this.views.push(view);
      return view;
    }
  }, {
    key: 'removeView',
    value: function removeView(view) {
      var index = this.views.indexOf(view);
      if (index === -1) {
        throw new Error('view to remove does not exists in controller');
      }
      view.remove();
      this.views.splice(index, 1);
    }
  }, {
    key: 'removeViews',
    value: function removeViews() {
      var _this2 = this;

      var views = this.views.slice();
      views.forEach(function (view) {
        _this2.removeView(view);
      });
    }
  }]);

  return Controller;
})();

module.exports = Controller;