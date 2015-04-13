module.exports.$ = require('jquery');
module.exports.THREE = require('three');

module.exports.Model = require('./Model');
module.exports.Controller = require('./Controller');

module.exports.scenes = {
  SVGScene: require('./scenes/SVGScene'),
  ThreeJSScene: require('./scenes/ThreeJSScene'),
};

module.exports.View = require('./views/View');
module.exports.views = {
  SVGView: require('./views/SVGView'),
  ThreeJSView: require('./views/ThreeJSView'),
  AxesView: require('./views/AxesView'),
};