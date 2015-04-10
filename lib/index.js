module.exports.$ = require('jquery');
module.exports.THREE = require('three');

module.exports.Model = require('./Model');
module.exports.View = require('./View');
module.exports.Controller = require('./Controller');

module.exports.scenes = {
  SVGScene: require('./scenes/SVGScene'),
  ThreeJSScene: require('./scenes/ThreeJSScene'),
};

module.exports.views = {
  SVGView: require('./views/SVGView'),
};