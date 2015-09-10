var chai = require('chai');
var assert = chai.assert;

var ValidatedModel = require('../..').models.ValidatedModel;
var joi = require('../..').joi;

describe.only('StructModel', function() {

  it('can be constructed with an object', function() {
    var s1 = joi.object().keys({
      foo: joi.number().integer().required(),
      bar: joi.string(),
    });

    assert.throws(function() {
      new ValidatedModel({}, s1);      
    }, 'illegal value for construction');
    var m1 = new ValidatedModel({foo: 1}, s1);
    assert.equal(m1.foo, 1);
    assert.isUndefined(m1.bar);

    // change events
    var changes = [];
    m1.on('change', function(key, value) {
      changes.push([key, value]);
    });

    // Throws error if not valid and value remians the same
    assert.throws(function() {
      m1.foo = 'some string';
    }, 'ValidationError: child "foo" fails because ["foo" must be a number]');
    assert.throws(function() {
      m1.bar = 4;
    }, 'ValidationError: child "bar" fails because ["bar" must be a string]');
    assert.equal(m1.foo, 1);
    assert.isUndefined(m1.bar);

    // Updates the value and fires 'change' event
    m1.foo = 3;
    m1.bar = 'hello world';
    assert.equal(m1.foo, 3);
    assert.deepEqual(changes, [['foo', 3], ['bar', 'hello world']]);
  });

});
