var cloneDeep = require('lodash.clonedeep');
var joi = require('joi');

var Model = require('./Model');

// A generic model that also incorporates validation
// functions that prevent modification if values are 
// illegal
class ValidatedModel extends Model {

  constructor(value, schema) {
    super();
    if (joi.validate(value, schema).error) {
      throw new Error('illegal value for construction');
    }

    var _value = cloneDeep(value);

    if (schema._type === 'object') {
      schema._inner.children.forEach(function(child) {
        var key = child.key;
        Object.defineProperty(this, key, {

          set: function(x) {
            var potentialNewValue = cloneDeep(_value);
            potentialNewValue[key] = x;
            var result = joi.validate(potentialNewValue, schema);
            if (result.error) {
              throw new Error(result.error.toString());
            } else {
              _value = potentialNewValue;
              this.emitChange(key, x);
            }


          },
          get: function() {
            return _value[key];
          },

        });
      }, this);
    }
  }

}

module.exports = ValidatedModel;
