var THREE = require('three');

var OrbitControls = require('./OrbitControls');
var Scene = require('./Scene');
var EventGenerator = require('../events/EventGenerator');
var ThreeJSViewEventGenerator = require('../events/ThreeJSViewEventGenerator');

function ThreeJSScene($container, options) {
  Scene.call(this, $container);
  this.eventGenerator = new EventGenerator($container);
  this.viewEventGenerator = new ThreeJSViewEventGenerator(this);
  this.views = [];
  this.init($container, options);
}

ThreeJSScene.prototype = Object.create(Scene.prototype);

ThreeJSScene.prototype.init = function($container, options) {
  options = (options === undefined) ? {} : options;
  if (options.cameraPosition === undefined) {
    options.cameraPosition = {
      x: 0.2,
      y: -2,
      z: 1.5,
    };
  }
  if (options.cameraUp === undefined) {
    options.cameraUp = {
      x: 0,
      y: 0,
      z: 1,
    };
  }

  var width = $container.width();
  var height = $container.height();

  // camera
  var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.up.set(options.cameraUp.x, options.cameraUp.y, options.cameraUp.z);
  camera.position.set(options.cameraPosition.x, options.cameraPosition.y, options.cameraPosition.z);
  this.camera = camera;

  // Each layer has a scene
  var layers = [new THREE.Scene()];
  if (options.layers) {
    for (var i = 0; i < options.layers; ++i) {
      layers.push(new THREE.Scene());
    }
  }

  // lights
  var directionalLights = layers.map(function(layer) {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-1, -1, -1);
    layer.add(directionalLight);
    layer.add(new THREE.AmbientLight(0x222222));
    return directionalLight;
  });

  // renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(0xffffff, 1);
  renderer.autoClear = false;
  renderer.setSize(width, height);
  renderer.sortObjects = false;
  $container[0].appendChild(renderer.domElement);

  // controls
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.damping = 0.2;
  if (options.disableRotate) {
    controls.noRotate = true;
  }
  this.controls = controls;

  // debug
  // scene.add(new THREE.Mesh(
  //   new THREE.BoxGeometry(1,1,1),
  //   new THREE.MeshLambertMaterial({color: 0x0000ff, transparent: true, opacity: 0.5})));

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }

  var redraw = true;

  function render() {
    if (redraw) {
      directionalLights.forEach(function(light) {
        light.position.copy(camera.position);
      });
      renderer.clear();
      renderer.render(layers[0], camera);
      for (var i = 1; i < layers.length; ++i) {
        renderer.clearDepth();
        renderer.render(layers[i], camera);
      }
      redraw = false;
    }
  }

  function resize() {
    var width = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    redraw = true;
  }

  this.add = function(view) {
    this.views.push(view);
    var layer = view.layer || 0;
    layers[layer].add(view.sceneObject);
    redraw = true;
  };

  this.remove = function(view) {
    var layer = view.layer || 0;
    var index = this.views.indexOf(view);
    if (index === -1) {
      throw new Error('view not found');
    }
    this.views.splice(index, 1);
    layers[layer].remove(view.sceneObject);
    render();
  };

  window.addEventListener('resize', resize, false);
  controls.addEventListener('change', function() {
    redraw = true;
  });

  this.redraw = function() {
    redraw = true;
  };

  animate();

  // Resize on the next event loop tick since a scroll bar may have been added
  // in the meantime.
  setTimeout(resize, 0);
};

module.exports = ThreeJSScene;