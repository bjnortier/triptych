class DOMBinding {

  constructor(model, field) {
    var _this = this;
    model.on('validation_error', function(key) {
      if (key === field) {
        _this.$el.addClass('error');
      }
    });
    model.on('change', function(key) {
      if (key === field) {
        _this.$el.removeClass('error');
      }
    });
  }

}


module.exports = DOMBinding;