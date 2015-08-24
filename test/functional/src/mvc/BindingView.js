var flow = require('../../../..');
var $ = flow.$;
var DOMView = flow.views.DOMView;

class TextInput {

  constructor(model, field) {
    var $el = $('<input type="text" value="' + model[field] + '">');
    ['onpaste', 'oninput'].forEach(event => {
      $el[0][event] = () => {
        let v = $el.val();
        model[field] = v;
      };
    });
    model.on('change', (changeField, changeValue) => {
      if ((field === changeField) && (this.$el.val() !== changeValue)) {
        $el.val(changeValue);
      }
    });

    this.$el = $el;
  }

}

class Text {

  constructor(model, field) {
    var $el = $('<span>' + model[field] + '</span>');
    model.on('change', (changeField, changeValue) => {
      if (field === changeField) {
        $el.html(changeValue);
      }
    });
    this.$el = $el;
  }

}

class Select {

  constructor(model, field) {
    var value = model[field];
    var $el = $('<select>' + 
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

class BindingView extends DOMView {

  constructor(model, scene) {
    super(model, scene);
  }

  render() {
    super.render();

    var dataBindings = [
      new TextInput(this.model, 'foo'),
      new TextInput(this.model, 'foo'),
      new Text(this.model, 'foo'),
      new Select(this.model, 'bar'),
      new Select(this.model, 'bar'),
      new Text(this.model, 'bar'),
    ];

    dataBindings.forEach(binding => {
      this.$el.append(binding.$el);
    });
  }

  update() {
    // All updates handled by data bindings
  }

}

module.exports = BindingView;