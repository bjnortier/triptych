var $ = require('jquery');

var DOMBinding = require('./DOMBinding');

class Select extends DOMBinding {

  constructor(model, field) {
    super(model, field);
    
    var value = model[field];
    var $el = $('<select class="' + field + '">' + 
      model[field + 'Spec'].options.map(option => {
        return '<option value="' + option + '"' +
          ((value === option) ? ' selected="selected"' : ' ') +
          '>' + option + '</option>';
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