var keys = require('lodash.keys');
var trip = require('../../../..');
var Model = trip.Model;

class BindingModel extends Model {

  constructor() {
    super();

    var fields = {
      foo: 'some string',
      bar: 'b',
      baz: true,
      bob: 1,
    };

    var fieldSpecs = {
      bar: ['a', 'b', 'c'],
      bob: [{label: 'one', value: 1}, {label: 'two', value: 2}],
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
