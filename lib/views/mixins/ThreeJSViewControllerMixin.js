class ThreeJSViewMixin {

  constructor(view) {
    var _this = this;
    [
      ['click', 'threeJSViewClick'],
      ['mouseenter', 'threeJSViewMouseEnter'],
      ['mouseover', 'threeJSViewMouseOver'],
      ['mouseleave', 'threeJSViewMouseLeave'],
    ].map(function(typeAndFunctionName) {
      var type = typeAndFunctionName[0];
      var functionName = typeAndFunctionName[1];
      view.on(type, function(event, data) {
        if (_this[functionName] !== undefined) {
          _this[functionName](event, data);
        }
      });
    });
  }

}

module.exports = ThreeJSViewMixin;

