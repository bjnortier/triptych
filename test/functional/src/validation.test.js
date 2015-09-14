var flow = require('../../..');
var $ = flow.$;
var DOMScene = flow.scenes.DOMScene;

var domScene = new DOMScene($('#dom'));
var model = new (require('./mvc/ValidationModel'))();
new (require('./mvc/BindingView'))(model, domScene);
