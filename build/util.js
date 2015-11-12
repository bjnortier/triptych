'use strict';

var THREE = require('three');

module.exports.mouse3DForEventPosition = function (scene, position) {
  var sceneElement = scene.$container;
  var mouseX = position.x / sceneElement.innerWidth() * 2 - 1;
  var mouseY = -(position.y / sceneElement.innerHeight()) * 2 + 1;
  var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
  return vector.unproject(scene.camera);
};