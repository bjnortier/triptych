var trip = require('../../../..');
var $ = trip.$;
var ThreeJSScene = trip.scenes.ThreeJSScene;
var Controller = trip.Controller;
var Model = trip.Model;

var RectangleView = require('./RectangleView');

class RenderingOrderController extends Controller {

  constructor() {
    super(new Model());

    var threeJSSceneOptions = {
      cameraPosition: {
        x: 5, y: 5, z: 2,
      }
    };
    var threeJSScene = new ThreeJSScene($('#viewport'), threeJSSceneOptions);

    this.addView(threeJSScene, RectangleView,
      {
        position: {
          x: 0.0,
          y: 0.0,
          z: 0,
        },
        color: 0x0000ff,
        order: 0,
      });
    this.addView(threeJSScene, RectangleView,
      {
        position: {
          x: 0.5,
          y: 0.5,
          z: 0,
        },
        color: 0x00ff00,
        order: 1
      });
    this.addView(threeJSScene, RectangleView,
      {
        position: {
          x: 0.75,
          y: 0.75,
          z: 0,
        },
        color: 0xff0000,
        order: 2
      });
  }

}

module.exports = RenderingOrderController;