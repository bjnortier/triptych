var flow = require('../../..');
var $ = flow.$;
var EmptyModel = flow.Model;
var ThreeJSScene = flow.scenes.ThreeJSScene;
var DOMScene = flow.scenes.DOMScene;
var AxesView = flow.views.AxesView;

var CubeView = require('./CubeView');
var EventDebugView = require('./EventDebugView');

var threeJSSceneOptions = {
  cameraPosition: {
    x: 1, y: 2, z: 1
  }
};
var threeJSScene = new ThreeJSScene($('#viewport'), threeJSSceneOptions);
var domScene = new DOMScene($('#dom'));

var model = new EmptyModel();
new AxesView(model, threeJSScene);
new CubeView(model, threeJSScene);

new EventDebugView(model, domScene);