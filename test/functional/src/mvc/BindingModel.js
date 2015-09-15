var keys = require('lodash.keys');
var flow = require('../../../..');
var Model = flow.Model;

class BindingModel extends Model {

  constructor() {
    super();

    var fields = {
      foo: 'some string',
      bar: 'b',
      baz: true,
    };

    var fieldSpecs = {
      bar: {
        options: ['a', 'b', 'c'],
      }
    };

    keys(fields).forEach(key => {
      this.__defineSetter__(key, value => {
        fields[key] = value;
        this.emitChange(key, value);
      });

      this.__defineGetter__(key, () => {
        return fields[key];
      });

      this.__defineGetter__(key + 'Spec', () => {
        return fieldSpecs[key];
      });
    });
  }

}

module.exports = BindingModel;