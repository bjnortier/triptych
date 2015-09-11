var cloneDeep = require('lodash.clonedeep');
var joi = require('joi');

var Model = require('./Model');

// A generic model that also incorporates validation
// functions that prevent modification if values are 
// illegal
class JoiModel extends Model {

  constructor(value, schema) {
    super();
    if (schema._type !== 'object') {
      throw new Error('schema must have object type at root'); 
    }
    var error;
    if (error = joi.validate(value, schema).error) {
      throw new Error(`illegal value for construction: ${error}`);
    }

    var _struct = cloneDeep(value);
  
    schema._inner.children.forEach(function(child) {
      var key = child.key;
      Object.defineProperty(this, key, {

        set: function(value) {
          var potentialNewStruct = cloneDeep(_struct);
          potentialNewStruct[key] = value;
          var result = joi.validate(potentialNewStruct, schema);
          if (result.error) {
            this.emit('validation_error', key, value);
            throw new Error(`validation failed: ${key}=${JSON.stringify(value)}`);
          } else {
            _struct = potentialNewStruct;
            this.emitChange(key, value);
          }
        },

        get: function() {
          return _struct[key];
        },

      });
    }, this);
  }
}

module.exports = JoiModel;
