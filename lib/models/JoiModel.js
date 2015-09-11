var cloneDeep = require('lodash.clonedeep');
var joi = require('joi');

var Model = require('./Model');

// A generic model that also incorporates validation
// functions that prevent modification if values are 
// illegal
class JoiModel extends Model {

  constructor(struct, schema) {
    super();
    if (schema._type !== 'object') {
      throw new Error('schema must have object type at root'); 
    }
    var error;
    if (error = joi.validate(struct, schema).error) {
      throw new Error('illegal value for construction: ' + error);
    }

    var _struct = cloneDeep(struct);
  
    schema._inner.children.forEach(function(child) {
      var key = child.key;
      Object.defineProperty(this, key, {
        set: function() {
          throw new Error('cannot set values directly, use set(a[.b], value)');
        },
        get: function() {
          return _struct[key];
        },
      });
    }, this);

    // Cannot set values directly due to lack of Proxy
    // support in JS and we need validation an 'onchange'
    // events when changing the value of the model.
    this.set = function(key, value) {
      var potentialNewStruct = cloneDeep(_struct);

      var keySegments = key.split('.');
      // Find the final object in the chain and assign new value
      // to that property
      var finalObject;
      if (keySegments.length > 1) {
        finalObject = keySegments.slice(0, keySegments.length - 1).reduce(function(obj, segment) {
          if (!obj.hasOwnProperty(segment)) {
            obj[segment] = {};
          }
          return obj[segment];
        }, potentialNewStruct);
      } else {
        finalObject = potentialNewStruct;
      }
      finalObject[keySegments[keySegments.length - 1]] = value;

      var result = joi.validate(potentialNewStruct, schema);
      if (result.error) {
        this.emit('validation_failed', key, value);
        throw new Error(`validation_failed: ${key}=${JSON.stringify(value)}`);
      } else {
        _struct = potentialNewStruct;
        this.emitChange(key, value);
      }
    };
  }

}

module.exports = JoiModel;
