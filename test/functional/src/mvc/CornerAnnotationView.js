const trip = require('../../../..');
const ThreeJSAnnotationView = trip.views.ThreeJSAnnotationView;

class CornerAnnotationView extends ThreeJSAnnotationView {

  constructor(model, threeJSScene, position) {
    super(model, threeJSScene, position);
  }

  render() {
    super.render();
    var template = `
        <div class="corner">
          <span class="x">{{x}}</span>
          <span class="y">{{y}}</span>
          <span class="z">{{z}}</span>
        </div>`;
    var view = this.position;
    this.toHtml(template, view);
  }

}

module.exports = CornerAnnotationView;