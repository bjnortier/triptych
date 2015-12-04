var $ = require('jquery');
var isString = require('lodash.isstring');

var DOMBinding = require('./DOMBinding');

class Select extends DOMBinding {

  constructor(model, field) {
    super(model, field);

    var value = model[field];
    var $el = $('<select class="' + field + '">' +
      model[field + 'Spec'].map(option => {
        let optionLabel;
        let optionValue;
        if (isString(option)) {
          optionLabel = option;
          optionValue = option;
        } else {
          optionLabel = option.label;
          optionValue = option.value;
        }
        return '<option value="' + optionValue + '"' +
          ((value === optionValue) ? ' selected="selected"' : ' ') +
          '>' + optionLabel + '</option>';
      }).  join('') + '</select>');
    $el.change(() => {
      let v = $el.val();
      model[field] = v;
    });
    model.on('change', (changeField, changeValue) => {
      if (field === changeField) {
        $el.find('option[value="' + changeValue + '"]').attr('selected', 'selected');
      }
    });
    this.$el = $el;
  }

}

module.exports = Select;
