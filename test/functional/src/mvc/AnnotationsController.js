var trip = require('../../../..');
var $ = trip.$;
var ThreeJSScene = trip.scenes.ThreeJSScene;
var Controller = trip.Controller;
var Model = trip.Model;
var AxesView = trip.views.AxesView;

var CubeView = require('./CubeView');
var CornerAnnotationView = require('./CornerAnnotationView');

class AnnotationsController extends Controller {

  constructor() {
    super(new Model());

    var threeJSSceneOptions = {
      cameraPosition: {
        x: 5, y: 5, z: 2,
      }
    };
    var threeJSScene = new ThreeJSScene($('#viewport'), threeJSSceneOptions);

    this.addView(threeJSScene, CubeView, {position: {x: 0.5, y: 0, z: 1.5}});
    this.addView(threeJSScene, CornerAnnotationView, {x: 0.0, y: 0.0, z: 0.0});
    this.addView(threeJSScene, CornerAnnotationView, {x: 1.0, y: 0.5, z: 1});
    this.addView(threeJSScene, CornerAnnotationView, {x: 0, y: -0.5, z: 2});
    this.addView(threeJSScene, AxesView);
  }

}

module.exports = AnnotationsController;