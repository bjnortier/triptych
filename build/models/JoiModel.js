'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cloneDeep = require('lodash.clonedeep');
var joi = require('joi');

var Model = require('./Model');

// A generic model that also incorporates validation
// functions that prevent modification if values are
// illegal

var JoiModel = (function (_Model) {
  _inherits(JoiModel, _Model);

  function JoiModel(value, schema) {
    _classCallCheck(this, JoiModel);

    _get(Object.getPrototypeOf(JoiModel.prototype), 'constructor', this).call(this);
    if (schema._type !== 'object') {
      throw new Error('schema must have object type at root');
    }
    var error;
    if (error = joi.validate(value, schema).error) {
      throw new Error('illegal value for construction: ' + error);
    }

    var _struct = cloneDeep(value);

    schema._inner.children.forEach(function (child) {
      var key = child.key;
      Object.defineProperty(this, key, {

        set: function set(value) {
          var potentialNewStruct = cloneDeep(_struct);
          potentialNewStruct[key] = value;
          var result = joi.validate(potentialNewStruct, schema);
          if (result.error) {
            this.emit('validation_error', key, value);
            throw new Error('validation failed: ' + key + '=' + JSON.stringify(value));
          } else {
            _struct = potentialNewStruct;
            this.emitChange(key, value);
          }
        },

        get: function get() {
          return _struct[key];
        }

      });
    }, this);
  }

  return JoiModel;
})(Model);

module.exports = JoiModel;