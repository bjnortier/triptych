var trip = require('../../..');
var $ = trip.$;
var DOMScene = trip.scenes.DOMScene;

var domScene = new DOMScene($('#dom'));
var model = new (require('./mvc/BindingModel'))();
new (require('./mvc/BindingView'))(model, domScene);
