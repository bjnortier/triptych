var flow = require('../../..');
var $ = flow.$;
var DOMScene = flow.scenes.DOMScene;

var domScene = new DOMScene($('#dom'));
var model = new (require('./mvc/BindingModel'))();
var view = new (require('./mvc/BindingView'))(model, domScene);
console.log(model, view);