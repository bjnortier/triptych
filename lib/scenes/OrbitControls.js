// https://github.com/mrdoob/three.js/blob/r66/examples/js/controls/OrbitControls.js

/**
 * @author bjnortier / https://github.com/bjnortier
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning. It maintains
// the "up" direction as +Z, unlike the TrackballControls. Touch on tablet and phones is
// supported.
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe
//
// This is a drop-in replacement for (most) TrackballControls used in examples.
// That is, include this js file and wherever you see:
//      controls = new THREE.TrackballControls( camera );
//      controls.target.z = 150;
// Simple substitute "OrbitControls" and the control should work as-is.

var THREE = require('three');

function ZUpOrbitControls(camera, domElement) {
  this.camera = camera;
  this.domElement = ( domElement !== undefined ) ? domElement : document;

  // API

  // Set to false to disable this control
  this.enabled = true;

  // "target" sets the location of focus, where the control orbits around
  // and where it pans with respect to.
  this.target = new THREE.Vector3();

  // This option actually enables dollying in and out; left as "zoom" for
  // backwards compatibility
  this.noZoom = false;
  this.zoomSpeed = 1.0;

  // Limits to how far you can dolly in and out
  this.minDistance = 0;
  this.maxDistance = Infinity;

  // Set to true to disable this control
  this.noRotate = false;
  this.rotateSpeed = 1.0;

  // Set to true to disable this control
  this.noPan = false;
  this.keyPanSpeed = 7.0; // pixels moved per arrow key push

  // Set to true to automatically rotate around the target
  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

  // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.
  this.minPolarAngle = 0; // radians
  this.maxPolarAngle = Math.PI; // radians

  // Set to true to disable use of the keys
  this.noKeys = false;

  // The four arrow keys
  this.keys = {LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40};

  // internals

  var _this = this;

  var EPS = 0.000001;

  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();

  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();
  var panOffset = new THREE.Vector3();

  var offset = new THREE.Vector3();

  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  var phiDelta = 0;
  var thetaDelta = 0;
  var scale = 1;
  var pan = new THREE.Vector3();

  var lastPosition = new THREE.Vector3();

  var STATE = {
    NONE : -1,
    ROTATE : 0,
    DOLLY : 1,
    PAN : 2,
    TOUCH_ROTATE : 3,
    TOUCH_DOLLY : 4,
    TOUCH_PAN : 5
  };

  var state = STATE.NONE;

  // for reset

  this.target0 = this.target.clone();
  this.position0 = this.camera.position.clone();

  // events

  var changeEvent = {type: 'change'};
  var startEvent = {type: 'start'};
  var endEvent = {type: 'end'};

  function getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * _this.autoRotateSpeed;
  }

  function getZoomScale() {
    return Math.pow( 0.95, _this.zoomSpeed );
  }

  this.update = function() {
    var position = this.camera.position;

    offset.copy(position).sub(this.target);

    // angle from x-axis around z-axis
    var theta = Math.atan2(offset.y, offset.x);

    // angle from z-axis
    var phi = Math.atan2( Math.sqrt( offset.y * offset.y + offset.x * offset.x ), offset.z );

    if (this.autoRotate) {
      this.rotateLeft(getAutoRotationAngle());
    }

    theta += thetaDelta;
    phi += phiDelta;

    // restrict phi to be between desired limits
    phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, phi));

    // restrict phi to be between EPS and PI-EPS
    phi = Math.max(EPS, Math.min(Math.PI - EPS, phi));

    var radius = offset.length() * scale;

    // restrict radius to be between desired limits
    radius = Math.max(this.minDistance, Math.min(this.maxDistance, radius));

    // move target to panned location
    this.target.add(pan);

    offset.y = radius * Math.sin(phi) * Math.sin(theta);
    offset.x = radius * Math.sin(phi) * Math.cos(theta);
    offset.z = radius * Math.cos(phi);

    position.copy(this.target).add(offset);

    this.camera.lookAt(this.target);

    thetaDelta = 0;
    phiDelta = 0;
    scale = 1;
    pan.set(0, 0, 0);

    if (lastPosition.distanceTo(this.camera.position) > 0) {
      this.dispatchEvent(changeEvent);
      lastPosition.copy(this.camera.position);
    }
  };

  this.reset = function() {
    state = STATE.NONE;

    this.target.copy( this.target0 );
    this.camera.position.copy( this.position0 );

    this.update();
  };

  function onMouseMove(event) {
    if ( _this.enabled === false ) {
      return;
    }

    event.preventDefault();

    var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

    if ( state === STATE.ROTATE ) {
      if ( _this.noRotate === true ) {
        return;
      }

      rotateEnd.set( event.clientX, event.clientY );
      rotateDelta.subVectors( rotateEnd, rotateStart );

      // rotating across whole screen goes 360 degrees around
      _this.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * _this.rotateSpeed );

      // rotating up and down along whole screen attempts to go 360, but limited to 180
      _this.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * _this.rotateSpeed );

      rotateStart.copy( rotateEnd );
    } else if ( state === STATE.DOLLY ) {
      if ( _this.noZoom === true ) {
        return;
      }

      dollyEnd.set( event.clientX, event.clientY );
      dollyDelta.subVectors( dollyEnd, dollyStart );

      if ( dollyDelta.y > 0 ) {
        _this.dollyIn();
      } else {
        _this.dollyOut();
      }
      dollyStart.copy( dollyEnd );
    } else if ( state === STATE.PAN ) {
      if ( _this.noPan === true ) {
        return;
      }

      panEnd.set( event.clientX, event.clientY );
      panDelta.subVectors( panEnd, panStart );

      _this.pan( panDelta.x, panDelta.y );

      panStart.copy( panEnd );
    }

    _this.update();
  }

  function onMouseUp( /* event */ ) {
    if ( _this.enabled === false ) {
      return;
    }

    _this.domElement.removeEventListener( 'mousemove', onMouseMove, false );
    _this.domElement.removeEventListener( 'mouseup', onMouseUp, false );
    _this.dispatchEvent( endEvent );
    state = STATE.NONE;
  }

  function onMouseDown(event) {
    if ( _this.enabled === false ) {
      return;
    }
    event.preventDefault();

    if ( event.button === 0 ) {
      if ( _this.noRotate === true ) {
        return;
      }

      state = STATE.ROTATE;

      rotateStart.set( event.clientX, event.clientY );
    } else if ( event.button === 1 ) {
      if ( _this.noZoom === true ) {
        return;
      }

      state = STATE.DOLLY;

      dollyStart.set( event.clientX, event.clientY );
    } else if ( event.button === 2 ) {
      if ( _this.noPan === true ) {
        return;
      }

      state = STATE.PAN;

      panStart.set( event.clientX, event.clientY );
    }

    _this.domElement.addEventListener( 'mousemove', onMouseMove, false );
    _this.domElement.addEventListener( 'mouseup', onMouseUp, false );
    _this.dispatchEvent( startEvent );
  }

  function onMouseWheel(event) {
    if ( _this.enabled === false || _this.noZoom === true ) {
      return;
    }

    event.preventDefault();

    var delta = 0;

    if ( event.wheelDelta !== undefined ) { // WebKit / Opera / Explorer 9
      delta = event.wheelDelta;
    } else if ( event.detail !== undefined ) { // Firefox
      delta = -event.detail;
    }

    if ( delta > 0 ) {
      _this.dollyOut();
    } else {
      _this.dollyIn();
    }

    _this.update();
    _this.dispatchEvent( startEvent );
    _this.dispatchEvent( endEvent );
  }

  function onKeyDown(event) {
    if ( _this.enabled === false || _this.noKeys === true || _this.noPan === true ) {
      return;
    }

    switch (event.keyCode){
      case _this.keys.UP: {
        _this.pan( 0, _this.keyPanSpeed );
        _this.update();
        break;
      }
      case _this.keys.BOTTOM: {
        _this.pan( 0, -_this.keyPanSpeed );
        _this.update();
        break;
      }
      case _this.keys.LEFT: {
        _this.pan(_this.keyPanSpeed, 0 );
        _this.update();
        break;
      }
      case _this.keys.RIGHT: {
        _this.pan(-_this.keyPanSpeed, 0 );
        _this.update();
        break;
      }
    }
  }

  function touchstart(event) {
    if ( _this.enabled === false ) {
      return;
    }

    switch ( event.touches.length ) {

      case 1: {
        // one-fingered touch: rotate
        if ( _this.noRotate === true ) {
          return;
        }

        state = STATE.TOUCH_ROTATE;

        rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;
      }
      case 2: {
        // two-fingered touch: dolly
        if ( _this.noZoom === true ) {
          return;
        }

        state = STATE.TOUCH_DOLLY;

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );
        dollyStart.set( 0, distance );
        break;
      }
      case 3: {
        // three-fingered touch: pan
        if ( _this.noPan === true ) {
          return;
        }

        state = STATE.TOUCH_PAN;

        panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;
      }
      default: {
        state = STATE.NONE;
      }
    }

    _this.dispatchEvent( startEvent );
  }

  function touchmove(event) {
    if ( _this.enabled === false ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

    switch ( event.touches.length ) {
      case 1: {
        // one-fingered touch: rotate
        if ( _this.noRotate === true ) {
          return;
        }
        if ( state !== STATE.TOUCH_ROTATE ) {
          return;
        }

        rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        // rotating across whole screen goes 360 degrees around
        _this.rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * _this.rotateSpeed );
        // rotating up and down along whole screen attempts to go 360, but limited to 180
        _this.rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * _this.rotateSpeed );

        rotateStart.copy( rotateEnd );

        _this.update();
        break;
      }
      case 2: {
        // two-fingered touch: dolly
        if ( _this.noZoom === true ) {
          return;
        }
        if ( state !== STATE.TOUCH_DOLLY ) {
          return;
        }

        var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        var distance = Math.sqrt( dx * dx + dy * dy );

        dollyEnd.set( 0, distance );
        dollyDelta.subVectors( dollyEnd, dollyStart );

        if ( dollyDelta.y > 0 ) {
          _this.dollyOut();
        } else {
          _this.dollyIn();
        }

        dollyStart.copy( dollyEnd );

        _this.update();
        break;
      }
      case 3: {
        // three-fingered touch: pan
        if ( _this.noPan === true ) {
          return;
        }
        if ( state !== STATE.TOUCH_PAN ) {
          return;
        }

        panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        panDelta.subVectors( panEnd, panStart );

        _this.pan( panDelta.x, panDelta.y );

        panStart.copy( panEnd );

        _this.update();
        break;
      }
      default: {
        state = STATE.NONE;
      }
    }
  }

  function touchend( /* event */ ) {
    if ( _this.enabled === false ) {
      return;
    }

    _this.dispatchEvent( endEvent );
    state = STATE.NONE;
  }


  this.rotateLeft = function(angle) {
    if ( angle === undefined ) {
      angle = getAutoRotationAngle();
    }
    thetaDelta -= angle;
  };

  this.rotateUp = function(angle) {
    if ( angle === undefined ) {
      angle = getAutoRotationAngle();
    }
    phiDelta -= angle;
  };

  // pass in distance in world space to move left
  this.panLeft = function(distance) {
    var te = this.camera.matrix.elements;
    // get X column of matrix
    panOffset.set( te[ 0 ], te[ 1 ], te[ 2 ] );
    panOffset.multiplyScalar(-distance);
    pan.add( panOffset );
  };

  // pass in distance in world space to move up
  this.panUp = function(distance) {
    var te = this.camera.matrix.elements;
    // get Y column of matrix
    panOffset.set( te[ 4 ], te[ 5 ], te[ 6 ] );
    panOffset.multiplyScalar( distance );
    pan.add( panOffset );
  };

  // pass in x,y of change desired in pixel space,
  // right and down are positive
  this.pan = function(deltaX, deltaY) {
    var element = _this.domElement === document ? _this.domElement.body : _this.domElement;

    if ( _this.camera.fov !== undefined ) {
      // perspective
      var position = _this.camera.position;
      var offset = position.clone().sub( _this.target );
      var targetDistance = offset.length();

      // half of the fov is center to top of screen
      targetDistance *= Math.tan( ( _this.camera.fov / 2 ) * Math.PI / 180.0 );

      // we actually don't use screenWidth, since perspective camera is fixed to screen height
      _this.panLeft( 2 * deltaX * targetDistance / element.clientHeight );
      _this.panUp( 2 * deltaY * targetDistance / element.clientHeight );
    } else if ( _this.camera.top !== undefined ) {
      // orthographic
      _this.panLeft( deltaX * (_this.camera.right - _this.camera.left) / element.clientWidth );
      _this.panUp( deltaY * (_this.camera.top - _this.camera.bottom) / element.clientHeight );
    } else {
      // camera neither orthographic or perspective
      console.warn(
        'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
    }
  };

  this.dollyIn = function(dollyScale) {
    if (dollyScale === undefined) {
      dollyScale = getZoomScale();
    }
    scale /= dollyScale;
  };

  this.dollyOut = function(dollyScale) {
    if (dollyScale === undefined) {
      dollyScale = getZoomScale();
    }
    scale *= dollyScale;
  };


  this.domElement.addEventListener( 'contextmenu', function(event) {
    event.preventDefault();
  }, false);
  this.domElement.addEventListener( 'mousedown', onMouseDown, false );
  this.domElement.addEventListener( 'mousewheel', onMouseWheel, false );
  this.domElement.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

  this.domElement.addEventListener( 'touchstart', touchstart, false );
  this.domElement.addEventListener( 'touchend', touchend, false );
  this.domElement.addEventListener( 'touchmove', touchmove, false );

  window.addEventListener( 'keydown', onKeyDown, false );
}

ZUpOrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);

module.exports = ZUpOrbitControls;
