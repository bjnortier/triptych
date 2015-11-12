'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var DOMBinding = function DOMBinding(model, field) {
  _classCallCheck(this, DOMBinding);

  var _this = this;
  model.on('validation_error', function (key) {
    if (key === field) {
      _this.$el.addClass('error');
    }
  });
  model.on('change', function (key) {
    if (key === field) {
      _this.$el.removeClass('error');
    }
  });
};

module.exports = DOMBinding;