var ee = require('event-emitter');

function Model() {
  ee(this);
}

// Create a generic emit so that when a caller does
// emitChange(a,b), the listener to the 'change' event
// will be notified as on('change', function(a,b) {})
// 
// MDN recommends pushing arguments instead of using
// Array.slice for optimisation 
Model.prototype.emitChange = function() {
  var applyArgs = ['change'];
  for (var i = 0; i < arguments.length; ++i) {
    applyArgs.push(arguments[i]);
  }
  this.emit.apply(this, applyArgs);
};

module.exports = Model;