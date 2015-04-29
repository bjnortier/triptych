module.exports.$ = require('jquery');
module.exports.mustache = require('mustache');
module.exports.THREE = require('three');

module.exports.Model = require('./models/Model');
module.exports.CompositeModel = require('./models/CompositeModel');

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
  AxesView: require('./views/AxesView'),
};

module.exports.Controller = require('./controllers/Controller');

module.exports.util = require('./util');