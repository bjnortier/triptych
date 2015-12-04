'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = require('jquery');
var isString = require('lodash.isstring');

var DOMBinding = require('./DOMBinding');

var Select = (function (_DOMBinding) {
  _inherits(Select, _DOMBinding);

  function Select(model, field) {
    _classCallCheck(this, Select);

    _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, model, field);

    var value = model[field];
    var $el = $('<select class="' + field + '">' + model[field + 'Spec'].map(function (option) {
      var optionLabel = undefined;
      var optionValue = undefined;
      if (isString(option)) {
        optionLabel = option;
        optionValue = option;
      } else {
        optionLabel = option.label;
        optionValue = option.value;
      }
      return '<option value="' + optionValue + '"' + (value === optionValue ? ' selected="selected"' : ' ') + '>' + optionLabel + '</option>';
    }).join('') + '</select>');
    $el.change(function () {
      var v = $el.val();
      model[field] = v;
    });
    model.on('change', function (changeField, changeValue) {
      if (field === changeField) {
        $el.find('option[value="' + changeValue + '"]').attr('selected', 'selected');
      }
    });
    this.$el = $el;
  }

  return Select;
})(DOMBinding);

module.exports = Select;