function DOMViewMixin(view) {
  var _this = this;
  view.$el.click(function(event) {
    _this.domViewClick(event, view);
  });
}

module.exports = DOMViewMixin;

