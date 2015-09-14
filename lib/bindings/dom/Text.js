var $ = require('jquery');

var DOMBinding = require('./DOMBinding');

class Text extends DOMBinding {

  constructor(model, field) {
    super(model, field);
    
    var $el = $('<span class="' + field + '">' + model[field] + '</span>');
    model.on('change', (changeField, changeValue) => {
      if (field === changeField) {
        $el.html(changeValue);
      }
    });
    this.$el = $el;
  }

}

module.exports = Text;