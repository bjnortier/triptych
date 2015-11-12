'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var THREE = require('three');

var OrbitControls = require('./OrbitControls');
var Scene = require('./Scene');
var EventGenerator = require('../events/EventGenerator');
var ThreeJSViewEventGenerator = require('../events/ThreeJSViewEventGenerator');

var ThreeJSScene = (function (_Scene) {
  _inherits(ThreeJSScene, _Scene);

  function ThreeJSScene($container, options) {
    _classCallCheck(this, ThreeJSScene);

    _get(Object.getPrototypeOf(ThreeJSScene.prototype), 'constructor', this).call(this, $container, options);

    options = options === undefined ? {} : options;
    if (options.cameraPosition === undefined) {
      options.cameraPosition = {
        x: 0.2,
        y: -2,
        z: 1.5
      };
    }
    if (options.cameraUp === undefined) {
      options.cameraUp = {
        x: 0,
        y: 0,
        z: 1
      };
    }

    this.eventGenerator = new EventGenerator($container);
    this.viewEventGenerator = new ThreeJSViewEventGenerator(this);
    this.views = [];

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
      for (var i = 0; i < options.layers - 1; ++i) {
        layers.push(new THREE.Scene());
      }
    }

    // lights
    var directionalLights = layers.map(function (layer) {
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(-1, -1, -1);
      layer.add(directionalLight);
      layer.add(new THREE.AmbientLight(0x222222));
      return directionalLight;
    });

    // renderer
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff, 1);
    renderer.autoClear = false;
    renderer.setSize(width, height);
    $container[0].appendChild(renderer.domElement);

    // controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.damping = 0.2;
    if (options.disableRotate) {
      controls.noRotate = true;
    }
    if (options.target !== undefined) {
      controls.target = new THREE.Vector3(options.target.x, options.target.y, options.target.z);
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
    var _this = this;
    function render() {
      if (redraw) {
        directionalLights.forEach(function (light) {
          light.position.copy(camera.position);
        });
        renderer.clear();
        renderer.render(layers[0], camera);
        for (var i = 1; i < layers.length; ++i) {
          renderer.clearDepth();
          renderer.render(layers[i], camera);
        }
        redraw = false;
        _this.emit('render', camera);
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

    this.add = function (view) {
      this.views.push(view);
      var layer = view.layer || 0;
      layers[layer].add(view.sceneObject);
      redraw = true;
    };

    this.remove = function (view) {
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
    controls.addEventListener('change', function () {
      redraw = true;
    });

    this.redraw = function () {
      redraw = true;
    };

    animate();

    // Resize on the next event loop tick since a scroll bar may have been added
    // in the meantime.
    setTimeout(resize, 0);

    // Zoom to extents if the camera is constrained to
    // move in the XY plane (no rotation). I.e. of the scene
    // is a 2D view
    this.zoomTo2DExtents = function (filterFn) {
      var bounds = layers.reduce(function (acc, scene, i) {
        // Optionally filters on the layers to include in the
        // zoom
        if (filterFn) {
          if (filterFn(scene, i)) {
            return acc.union(new THREE.Box3().setFromObject(scene));
          } else {
            return acc;
          }
        } else {
          return acc.union(new THREE.Box3().setFromObject(scene));
        }
      }, new THREE.Box3());

      var centerX = (bounds.min.x + bounds.max.x) / 2;
      var centerY = (bounds.min.y + bounds.max.y) / 2;
      camera.position.setX(centerX);
      camera.position.setY(centerY);
      controls.target = new THREE.Vector3(camera.position.x, camera.position.y, 0);

      var margin = 10; // degrees of view margin around objects

      // For the max Y coordinate
      var distanceRequiredForY = (bounds.max.y - centerY) / Math.tan((camera.fov - margin) / 2 / 180 * Math.PI);

      // camera FOV is the vertical field of view, i.e. in the Y direction,
      // so adjust using aspect ratio.
      // For the max X coodrinate
      var distanceRequiredForX = (bounds.max.x - centerX) / camera.aspect / Math.tan((camera.fov - margin) / 2 / 180 * Math.PI);

      camera.position.z = Math.max(distanceRequiredForX, distanceRequiredForY);

      redraw = true;
    };

    this.__defineGetter__('camera', function () {
      return camera;
    });
  }

  return ThreeJSScene;
})(Scene);

module.exports = ThreeJSScene;