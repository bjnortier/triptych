var chai = require('chai');
var assert = chai.assert;

var Model = require('..').Model;
var View = require('..').View;

// ----- Simple M -----

function SimpleModel() {
  Model.call(this);
}

SimpleModel.prototype = Object.create(Model.prototype);

SimpleModel.prototype.set = function(key, value) {
  this.emitChange(key, value);
};

// ----- Simple V -----

function SimpleView(model) {
  this.changes = [];
  View.call(this, model);
}

SimpleView.prototype = Object.create(SimpleView.prototype);

SimpleView.prototype.onChange = function(key, value) {
  this.changes.push([key, value]);
};

SimpleView.prototype.render = function() {
};

// ----- Tests -----

describe('Model', function() {

  it('can emit changes', function() {
    var m = new SimpleModel();
    
    var changes = [];
    m.on('change', function(key, value) { changes.push([key, value]); });
    m.set('a', 1);

    assert.deepEqual(changes, [['a', 1]]);
  });

});

describe('MVC', function () {

  it('wires a Model and View', function() {
    var m = new SimpleModel();
    var v1 = new SimpleView(m);
    var v2 = new SimpleView(m);

    m.set('a', 1);
    assert.deepEqual(v1.changes, [['a', 1]]);
    assert.deepEqual(v2.changes, [['a', 1]]);
  });

});
