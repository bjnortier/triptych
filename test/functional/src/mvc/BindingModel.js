var keys = require('lodash.keys');
var flow = require('../../../..');
var Model = flow.Model;

class BindingModel extends Model {

  constructor() {
    super();

    var fields = {
      foo: 'some string',
      bar: 3.14159,
    };

    keys(fields).forEach(key => {
      this.__defineSetter__(key, value => {
        fields[key] = value;
        this.emitChange(key, value);
      });

      this.__defineGetter__(key, () => {
        return fields[key];
      });
    });
  }

}

module.exports = BindingModel;