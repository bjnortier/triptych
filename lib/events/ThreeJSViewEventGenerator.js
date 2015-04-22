var ee = require('event-emitter');
var THREE = require('three');

var util = require('../util');

function findClosestMesh(scene, meshes, position) {
  var camera = scene.camera;
  var mouse3D = util.mouse3DForEventPosition(scene, position);
  var raycaster = new THREE.Raycaster(camera.position, mouse3D.sub(camera.position).normalize());

  var intersects = raycaster.intersectObjects(meshes);
  if (intersects.length) {
    var sorted = intersects.sort(function(a, b) {
      if (a.distance < b.distance) {
        return -1;
      } else if (a.distance > b.distance) {
        return 1;
      } else {
        return 0;
      }
    });
    return {
      distance: sorted[0].distance,
      mesh: sorted[0].object,
      position: sorted[0].point,
    };
  } else {
    return undefined;
  }
}

function collectViewsAndMeshes(scene) {
  var viewsAndMeshes = scene.views.reduce(function(acc, view) {
    var meshes = [];
    view.sceneObject.traverseVisible(function(obj) {
      if (obj instanceof THREE.Mesh) {
        meshes.push(obj);
      }
    });

    if (meshes.length) {
      acc.push({
        view: view,
        meshes: meshes
      });
    }
    return acc;
  }, []);
  return viewsAndMeshes;
}

function findClosestViewForEvent(scene, position) {
  var viewsAndMeshes = collectViewsAndMeshes(scene);
  var viewLookup = viewsAndMeshes.reduce(function(acc, viewAndMeshes) {
    var view = viewAndMeshes.view;
    viewAndMeshes.meshes.reduce(function(acc, mesh) {
      acc[mesh.id] = view;
      return acc;
    }, acc);
    return acc;
  }, {});

  var allMeshes = viewsAndMeshes.reduce(function(acc, viewAndMeshes) {
    acc = acc.concat(viewAndMeshes.meshes);
    return acc;
  }, []);

  var closest = findClosestMesh(scene, allMeshes, position);
  if (closest !== undefined) {
    return {
      distance: closest.distance,
      position: {
        x: parseFloat(closest.position.x.toFixed(4)),
        y: parseFloat(closest.position.y.toFixed(4)),
        z: parseFloat(closest.position.z.toFixed(4)),
      },
      view: viewLookup[closest.mesh.id],
      mesh: closest.mesh,
    };
  } else {
    return undefined;
  }
}

function ThreeJSViewEventGenerator(scene) {

  var eventGenerator = scene.eventGenerator;
  ee(this);

  var _this = this;
  eventGenerator.on('click', function(event, position) {

    var closestViewResult = findClosestViewForEvent(scene, position);
    if (closestViewResult) {
      _this.emit(
        'click',
        event,
        closestViewResult);
    }
  });

  var lastOver;
  eventGenerator.on('mousemove', function(event, position) {
    var over = findClosestViewForEvent(scene, position);
    if (over) {
      // Either entered or cross to another view
      if (over.view !== (lastOver && lastOver.view)) {
        if (lastOver && lastOver.view) {
          _this.emit('mouseleave', event, lastOver);
        }
        _this.emit(
          'mouseenter', event, over);
      }
      lastOver = over;
      _this.emit('mouseover', event, over);
    } else {
      if (lastOver) {
        _this.emit('mouseleave', event, lastOver);
      }
      lastOver = undefined;
    }
  });

}

module.exports = ThreeJSViewEventGenerator;