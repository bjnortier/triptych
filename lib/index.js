module.exports.$ = require('jquery');
module.exports.mustache = require('mustache');
module.exports.THREE = require('three');
module.exports.joi = require('joi');

module.exports.Model = require('./models/Model');
module.exports.CompositeModel = require('./models/CompositeModel');
module.exports.models = {
  JoiModel: require('./models/JoiModel'),
};

module.exports.scenes = {
  DOMScene: require('./scenes/DOMScene'),
  SVGScene: require('./scenes/SVGScene'),
  ThreeJSScene: require('./scenes/ThreeJSScene'),
};

module.exports.View = require('./views/View');
module.exports.views = {
  DOMView: require('./views/DOMView'),
  SVGView: require('./views/SVGView'),
  ThreeJSView: require('./views/ThreeJSView'),
  ThreeJSAnnotationView: require('./views/ThreeJSAnnotationView'),
  AxesView: require('./views/AxesView'),
};

module.exports.bindings = {
  dom : {
    Text: require('./bindings/dom/Text'),
    TextInput: require('./bindings/dom/TextInput'),
    Select: require('./bindings/dom/Select'),
    Checkbox: require('./bindings/dom/Checkbox'),
  }
};

module.exports.Controller = require('./controllers/Controller');

module.exports.util = require('./util');