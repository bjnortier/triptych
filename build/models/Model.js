'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ee = require('event-emitter');

var Model = (function () {
  function Model() {
    _classCallCheck(this, Model);

    ee(this);
  }

  // Create a generic emit so that when a caller does
  // emitChange(a,b), the listener to the 'change' event
  // will be notified as on('change', function(a,b) {})
  //
  // MDN recommends pushing arguments instead of using
  // Array.slice for optimisation

  _createClass(Model, [{
    key: 'emitChange',
    value: function emitChange() {
      var applyArgs = ['change'];
      for (var i = 0; i < arguments.length; ++i) {
        applyArgs.push(arguments[i]);
      }
      this.emit.apply(this, applyArgs);
    }
  }]);

  return Model;
})();

module.exports = Model;