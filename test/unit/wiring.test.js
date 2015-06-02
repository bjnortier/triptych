var chai = require('chai');
var assert = chai.assert;

var Model = require('../..').Model;
var View = require('../..').View;

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
  this.functions = [];
  View.call(this, model);
}

SimpleView.prototype = Object.create(SimpleView.prototype);

SimpleView.prototype.render = function() {
  this.functions.push('render');
};

SimpleView.prototype.update = function() {
  this.functions.push('update');
};

// ----- Tests -----

describe('Model', function() {

  it('can emit changes', function() {
    var m = new SimpleModel();
    
    var functions = [];
    m.on('change', function(key, value) { functions.push([key, value]); });
    m.set('a', 1);

    assert.deepEqual(functions, [['a', 1]]);
  });

});

describe('MVC', function () {

  it('wires a Model and View', function() {
    var m = new SimpleModel();
    var v1 = new SimpleView(m);
    var v2 = new SimpleView(m);

    m.set('a', 1);
    assert.deepEqual(v1.functions, ['render', 'update']);
    assert.deepEqual(v2.functions, ['render', 'update']);
  });

});
