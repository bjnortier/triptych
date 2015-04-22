function DOMViewMixin(view) {
  var _this = this;
  view.$el.click(function(event) {
    if (_this.domViewClick !== undefined) {
      _this.domViewClick(event, view);
    }
  });
}

module.exports = DOMViewMixin;

