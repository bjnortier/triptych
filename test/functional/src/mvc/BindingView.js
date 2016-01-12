var trip = require('../../../..');
var DOMView = trip.views.DOMView;
var TextInput = trip.bindings.dom.TextInput;
var Text = trip.bindings.dom.Text;
var Select = trip.bindings.dom.Select;
var Checkbox = trip.bindings.dom.Checkbox;

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
        new Select(this.model, 'bob'),
        new Select(this.model, 'bob'),
        new Text(this.model, 'bob'),
        new Checkbox(this.model, 'baz'),
        new Checkbox(this.model, 'baz'),
        new Text(this.model, 'baz'),
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
