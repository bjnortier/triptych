var flow = require('../../..');
var $ = flow.$;
var EmptyModel = flow.Model;
var ThreeJSScene = flow.scenes.ThreeJSScene;
var DOMScene = flow.scenes.DOMScene;
var AxesView = flow.views.AxesView;


var CubeView = require('./CubeView');
var EventCaptureModel = require('./EventCaptureModel');
var EventCaptureController = require('./EventCaptureController');
var EventCaptureView = require('./EventCaptureView');

var threeJSSceneOptions = {
  cameraPosition: {
    x: 1, y: 2, z: 1
  }
};
var threeJSScene = new ThreeJSScene($('#viewport'), threeJSSceneOptions);
var domScene = new DOMScene($('#dom'));

var emptyModel = new EmptyModel();
new AxesView(emptyModel, threeJSScene);
var c1 = new CubeView(emptyModel, threeJSScene);
var c2 = new CubeView(emptyModel, threeJSScene, {
  color: 0xff6666, 
  position: {x: 0.6, y: 0, z: 0},
  size: 0.2
});

var eventCaptureModel = new EventCaptureModel();
var eventCaptureController = new EventCaptureController(
  eventCaptureModel, threeJSScene, c1, c2);
eventCaptureController.addView(domScene, EventCaptureView);