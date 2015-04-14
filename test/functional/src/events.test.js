var flow = require('../../..');
var $ = flow.$;
var EmptyModel = flow.Model;
var Scene = flow.scenes.ThreeJSScene;
var AxesView = flow.views.AxesView;

var CubeView = require('./CubeView');

var sceneOptions = {
  cameraPosition: {
    x: 1, y: 2, z: 1
  }
};
var scene = new Scene($('#viewport'), sceneOptions);

var model = new EmptyModel();
new AxesView(model, scene);
new CubeView(model, scene);