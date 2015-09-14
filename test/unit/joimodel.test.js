var chai = require('chai');
var assert = chai.assert;

var JoiModel = require('../..').models.JoiModel;
var joi = require('../..').joi;

describe('JoiModel', function() {

  it('can be constructed with an object', function() {
    assert.throws(function() {
      new JoiModel({}, joi.number());      
    }, 'schema must have object type at root');

    var s1 = joi.object().keys({
      foo: joi.number().integer().required(),
      bar: joi.string(),
    });

    assert.throws(function() {
      new JoiModel({}, s1);      
    }, 'illegal value for construction');
    var m1 = new JoiModel({foo: 1}, s1);
    assert.equal(m1.foo, 1);
    assert.isUndefined(m1.bar);
  });

  it('set values', function() {
    var s1 = joi.object().keys({
      foo: joi.number().integer().required(),
      bar: joi.string(),
    });
    var m1 = new JoiModel({foo: 1}, s1);

    // change events
    var events = [];
    m1.on('change', function(key, value) {
      events.push(['change', key, value]);
    });
    m1.on('validation_error', function(key, value) {
      events.push(['validation_error', key, value]);
    });

    // Throws error if not valid and value remians the same
    assert.throws(function() {
      m1.foo = 'some string';
    }, 'validation failed: foo="some string"');
    assert.throws(function() {
      m1.bar = 4;
    }, 'validation failed: bar=4');
    assert.equal(m1.foo, 1);
    assert.isUndefined(m1.bar);

    // Updates the value and fires 'change' event
    m1.foo = 3;
    m1.bar = 'hello world';
    assert.equal(m1.foo, 3);
    assert.deepEqual(events, [
      ['validation_error', 'foo', 'some string'],
      ['validation_error', 'bar', 4],
      ['change', 'foo', 3], 
      ['change', 'bar', 'hello world']
    ]);
  });

});
