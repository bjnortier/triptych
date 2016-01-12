var trip = require('../../../..');
var $ = trip.$;
var DOMScene = trip.scenes.DOMScene;
var ThreeJSScene = trip.scenes.ThreeJSScene;
var Controller = trip.Controller;

var EventCaptureModel = require('./EventCaptureModel');
var EventCaptureView = require('./EventCaptureView');
var AxesView = trip.views.AxesView;
var CubeView = require('./CubeView');

class EventCaptureController extends Controller {

  constructor() {
    super(new EventCaptureModel());

    var domScene = new DOMScene($('#dom'));
    this.addView(domScene, EventCaptureView);

    var threeJSSceneOptions = {
      cameraPosition: {
        x: 1, y: 2, z: 1
      }
    };
    var threeJSScene = new ThreeJSScene($('#viewport'), threeJSSceneOptions);
    this.addView(threeJSScene, CubeView, {
      label: 'c1',
    });
    this.addView(threeJSScene, CubeView, {
      label: 'c2',
      color: 0xff6666,
      position: {x: 0.6, y: 0, z: 0},
      size: 0.2
    });
    this.addView(threeJSScene, AxesView);
  }

  threeJSViewClick(event, view, data) {
    this.model.addEvent('click:' + view.label, event, data);
  }

  threeJSViewMouseEnter(event, view, data) {
    this.model.addEvent('enter:' + view.label, event, data);
  }

  threeJSViewMouseLeave(event, view, data) {
    this.model.addEvent('leave:' + view.label, event, data);
  }

  threeJSViewMouseOver(event, view, data) {
    this.model.addEvent('over:' + view.label, event, data);
  }

}

module.exports = EventCaptureController;
