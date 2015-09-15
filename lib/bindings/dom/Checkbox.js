var $ = require('jquery');

var DOMBinding = require('./DOMBinding');

class Checkbox extends DOMBinding {

  constructor(model, field) {
    super(model, field);
    
    var $el = $('<input class="' + field + '" type="checkbox" ' +
      (model[field] ? 'checked' : '') + '>');
    ['onchange'].forEach(event => {
      $el[0][event] = () => {
        let v = !!$el.prop('checked');
        try {
          model[field] = v;
        } catch(e) {
          // use events for validation errors
        }
      };
    });
    model.on('change', (changeField, changeValue) => {
      if ((field === changeField) && (this.$el.val() !== changeValue)) {
        $el.prop('checked', changeValue);
      }
    });

    this.$el = $el;
  }

}

module.exports = Checkbox;