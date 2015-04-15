var THREE = require('three');

var OrbitControls = require('./OrbitControls');
var Scene = require('./Scene');
var ThreeJSViewEventGenerator = require('../events/ThreeJSViewEventGenerator');

function ThreeJSScene($container, options) {
  Scene.call(this, $container);
  this.viewEventGenerator = new ThreeJSViewEventGenerator(this);
  this.views = [];
  this.init($container, options);
}

ThreeJSScene.prototype = Object.create(Scene.prototype);

ThreeJSScene.prototype.init = function($container, options) {
  options = (options === undefined) ? {} : options;
  if (options.cameraPosition === undefined) {
    options.cameraPosition = {
      x: 3,
      y: 3,
      z: 3,
    };
  }
  var width = $container.width();
  var height = $container.height();

  // camera
  var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.up.set(0, 0, 1);
  camera.position.x = options.cameraPosition.x;
  camera.position.y = options.cameraPosition.y;
  camera.position.z = options.cameraPosition.z;
  this.camera = camera;

  // scene
  var scene = new THREE.Scene();

  // lights
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-1, -1, -1);
  scene.add(directionalLight);
  scene.add(new THREE.AmbientLight(0x222222));

  // renderer
  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setClearColor(0xffffff, 1);
  renderer.setSize(width, height);
  $container[0].appendChild(renderer.domElement);

  // controls
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.damping = 0.2;
  this.controls = controls;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
  }

  function render() {
    directionalLight.position.copy(camera.position);
    renderer.render(scene, camera);
  }

  function resize() {
    var width = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    render();
  }

  this.add = function(view) {
    this.views.push(view);
    scene.add(view.sceneObject);
  };

  window.addEventListener('resize', resize, false);
  controls.addEventListener('change', render);

  animate();

  // Resize on the next event loop tick since a scroll bar may have been added
  // in the meantime.
  setTimeout(resize, 0);
};

module.exports = ThreeJSScene;