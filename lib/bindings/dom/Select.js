var $ = require('jquery');
var isString = require('lodash.isstring');

var DOMBinding = require('./DOMBinding');

class Select extends DOMBinding {

  constructor(model, field) {
    super(model, field);

    var value = model[field];
    var spec = model[field + 'Spec'];
    var $el = $('<select class="' + field + '">' +
      spec.map(option => {
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
      // Actually find the non-string value in the spec
      spec.forEach(option => {
        if (isString(option)) {
          if (option === v) {
            model[field] = v;
          }
        } else {
          if (String(option.value) === v) {
            model[field] = option.value;
          }
        }
      });
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
