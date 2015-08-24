var chai = require('chai');
var assert = chai.assert;

var Model = require('../..').Model;
var View = require('../..').View;

// ----- Simple M -----

class SimpleModel extends Model {
  set(key, value) {
    this.emitChange(key, value);
  }
}

// ----- Simple V -----

class SimpleView extends View {
  constructor(model) {
    super(model);
    this.functions = [];
  }
  render() {
    this.functions.push('render');
  }
  update() {
    this.functions.push('update');
  }
}

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

  it('wires a Model and View', function(done) {
    var m = new SimpleModel();
    var v1 = new SimpleView(m);
    var v2 = new SimpleView(m);

    // First render is done on next tick
    setTimeout(function() { 
      m.set('a', 1);
      assert.deepEqual(v1.functions, ['render', 'update']);
      assert.deepEqual(v2.functions, ['render', 'update']);
      done();
    }, 0);
  });

});
