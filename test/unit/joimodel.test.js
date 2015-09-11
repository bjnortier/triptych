var chai = require('chai');
var assert = chai.assert;

var JoiModel = require('../..').models.JoiModel;
var joi = require('../..').joi;

describe('JoiModel', function() {

  var events;
  function captureEvents(model) {
    events = [];
    model.on('change', function(key, value) {
      events.push(['change', key, value]);
    });
    model.on('validation_failed', function(key, value) {
      events.push(['validation_failed', key, value]);
    });
  }

  it('can be constructed with an object', function() {
    assert.throws(function() {
      new JoiModel({}, joi.number());      
    }, 'schema must have object type at root');

    var schema = joi.object().keys({
      foo: joi.number().integer().required(),
      bar: joi.string(),
    });

    assert.throws(function() {
      new JoiModel({}, schema);      
    }, 'illegal value for construction');
    var model = new JoiModel({foo: 1}, schema);
    assert.equal(model.foo, 1);
    assert.isUndefined(model.bar);
  });

  it('set values', function() {
    var schema = joi.object().keys({
      foo: joi.number().integer().required(),
      bar: joi.string(),
    });
    var model = new JoiModel({foo: 1}, schema);
    captureEvents(model);

    // Cannot set values directly due to lack of Proxy
    // support in JS
    assert.throws(function() {
      model.foo = 7;
    }, 'cannot set values directly, use set(a[.b], value)');

    // Throws error if not valid and value remians the same
    assert.throws(function() {
      model.set('foo', 'some string');
    }, 'validation_failed: foo="some string"');
    assert.throws(function() {
      model.set('bar', 4);
    }, 'validation_failed: bar=4');
    assert.equal(model.foo, 1);
    assert.isUndefined(model.bar);

    // Updates the value and fires 'change' event
    model.set('foo', 3);
    model.set('bar', 'hello world');
    assert.equal(model.foo, 3);
    assert.deepEqual(events, [
      ['validation_failed', 'foo', 'some string'],
      ['validation_failed', 'bar', 4],
      ['change', 'foo', 3], 
      ['change', 'bar', 'hello world']
    ]);
  });

  it('set nested values', function() {
    var schema = joi.object().keys({
      foo: joi.object().required().keys({
        bar: joi.object().required().keys({
          x: joi.number(),
        }),
      }),
    });
    var model = new JoiModel({foo: {bar: {x: 2}}}, schema);
    assert.equal(model.foo.bar.x, 2);
    assert.deepEqual(model.foo.bar, {x: 2});

    // change events
    var events = [];
    model.on('change', function(key, value) {
      events.push(['change', key, value]);
    });
    model.on('validation_failed', function(key, value) {
      events.push(['validation_failed', key, value]);
    });

    // Illegal
    assert.throws(function() {
      model.set('foo.bar', {y: 3});
    }, 'validation_failed: foo.bar={"y":3}');
    assert.throws(function() {
      model.set('foo.bar.x', 'abc');
    }, 'validation_failed: foo.bar.x="abc"');

    model.set('foo.bar', {x: 7});

  });

});
