var ee = require('event-emitter');
var THREE = require('three');

function mouse3DForEvent(scene, event) {
  var sceneElement = scene.$container;
  var camera = scene.camera;

  var mouse = {};
  mouse.x = (event.offsetX / sceneElement.innerWidth()) * 2 - 1;
  mouse.y = -(event.offsetY / sceneElement.innerHeight()) * 2 + 1;

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  var mouse3D = vector.unproject(camera);
  return mouse3D;
}

function minIntersectDistance(sceneContainer, meshes, event) {
  var camera = sceneContainer.camera;
  var mouse3D = mouse3DForEvent(sceneContainer, event);
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

function collectMeshes(obj) {
  var meshes = [];
  if (obj instanceof THREE.Mesh) {
    meshes.push(obj);
  }
  var childMeshes = [];
  if (obj.children && (obj.children.length > 0)) {
    childMeshes = obj.children.reduce(function(acc, child) {
      return acc.concat(collectMeshes(child));
    }, []);
  }
  return meshes.concat(childMeshes);
}

function collectViewsAndMeshes(scene) {
  var viewsAndMeshes = scene.views.reduce(function(acc, view) {
    var meshes = collectMeshes(view.sceneObject);
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

function findClosestViewForEvent(scene, event) {
  var viewsAndMeshes = collectViewsAndMeshes(scene);
  var closestViewAndDistance = viewsAndMeshes.reduce(function(acc, viewAndMeshes) {
    var meshes = viewAndMeshes.meshes;
    var distanceAndMesh = minIntersectDistance(scene, meshes, event);
    if ((distanceAndMesh !== undefined) && (distanceAndMesh.distance < acc.distance)) {
      acc = {
        distance: distanceAndMesh.distance,
        position: distanceAndMesh.position,
        view: viewAndMeshes.view,
        mesh: distanceAndMesh.mesh,
      };
    }
    return acc;
  }, {distance: Infinity, view: undefined});
  return closestViewAndDistance;
}

function ThreeJSSceneObjectEventGenerator(scene) {

  var eventGenerator = scene.eventGenerator;
  ee(this);

  var _this = this;
  eventGenerator.on('click', function(x, y, event) {

    var closestViewAndDistance = findClosestViewForEvent(scene, event);
    console.log('!!', closestViewAndDistance);
    if (closestViewAndDistance.view) {
      _this.emit(
        'click',
        event,
        closestViewAndDistance.position,
        closestViewAndDistance.view,
        closestViewAndDistance.mesh);
    }
  });

}

module.exports = ThreeJSSceneObjectEventGenerator;