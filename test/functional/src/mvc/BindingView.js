var flow = require('../../../..');
var $ = flow.$;
// var mustache = flow.mustache;
var DOMView = flow.views.DOMView;

class TextInput {

  constructor(model, field) {
    var $el = $('<input type="text" value="' + model[field] + '">');
    $el.change(() => {
      let v = $el.val();
      model[field] = v;
    });
    this.$el = $el;
  }

}

class Text {

  constructor(model, field) {
    var $el = $('<span>' + model[field] + '</span>');
    this.$el = $el;
    model.on('change', (changeField, changeValue) => {
      if (field === changeField) {
        $el.html(changeValue);
      }
    });
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
      new Text(this.model, 'foo'),
    ];

    dataBindings.forEach(binding => {
      this.$el.append(binding.$el);
    });
  }

  update() {
    console.log('update');
  }

}

module.exports = BindingView;