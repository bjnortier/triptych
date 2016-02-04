var chai = require('chai');
var assert = chai.assert;

var mergeOptions = require('../../build/views/mergeOptions');

describe('options merge', function() {

  it('empty', function() {
    assert.deepEqual(mergeOptions({}, {}), {});
  });

  it('concatenations', function() {
    var criteria = {concatenations: ['class']};
    assert.deepEqual(
      mergeOptions({class: 'foo'}, {}, criteria),
      {class: 'foo'});
    assert.deepEqual(
      mergeOptions({}, {class: 'bar'}, criteria),
      {class: 'bar'});
    assert.deepEqual(
      mergeOptions({class: 'foo'}, {class: 'bar'}, criteria),
      {class: 'foo bar'});
  });

  it('conflicting keys generate errors', function() {
    assert.throws(function() {
      mergeOptions({id: 'foo'}, {id: 'bar'});
    }, 'option merge conflict: id');
  });

  it('can merge xor keys', function() {
    assert.deepEqual(mergeOptions(
      {a: 1, c: 2},
      {b: 3, c: 2}),
      {a: 1, b: 3, c: 2});
  });

  it('can merge complex structures', function() {
    var criteria = {concatenations: ['class', 'style']};
    assert.deepEqual(mergeOptions(
      {class: 'foo', style: 'height: 100%;', id: 'a4f', draggable: true},
      {class: 'bar baz', style: 'width: 30%;', tag: 'tr'},
      criteria),
        {
          class: 'foo bar baz',
          style: 'height: 100%; width: 30%;',
          id: 'a4f',
          draggable: true,
          tag: 'tr'
        });

  });

});
