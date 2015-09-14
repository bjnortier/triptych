var flow = require('../../../..');
var DOMView = flow.views.DOMView;
var TextInput = flow.bindings.dom.TextInput;
var Text = flow.bindings.dom.Text;
var Select = flow.bindings.dom.Select;

class BindingView extends DOMView {

  constructor(model, scene) {
    super(model, scene);
  }

  render() {
    super.render();

    var view = {
      bindings: [
        new TextInput(this.model, 'foo'),
        new TextInput(this.model, 'foo'),
        new Text(this.model, 'foo'),
        new Select(this.model, 'bar'),
        new Select(this.model, 'bar'),
        new Text(this.model, 'bar'),
      ]
    };

    var template = 
      '{{#bindings}}' + 
        '<div>{{{.}}}</div>' +
      '{{/bindings}}';

    this.toHtml(template, view);
  }

  update() {
    // All updates handled by data bindings
  }

}

module.exports = BindingView;