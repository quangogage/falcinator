'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullets = undefined;
exports.shootBullet = shootBullet;
exports.updateBullets = updateBullets;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Camera = require('../Camera/Camera');

var _BurstShot = require('../Powerups/PowerupHandlers/BurstShot');

var _HandlePowerups = require('../Powerups/HandlePowerups');

var _Envelop = require('./types/Envelop');

var _Envelop2 = _interopRequireDefault(_Envelop);

var _CannonBall = require('./types/CannonBall');

var _CannonBall2 = _interopRequireDefault(_CannonBall);

var _Missile = require('./types/Missile');

var _Missile2 = _interopRequireDefault(_Missile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = exports.bullets = [];
var speed = 1;

var types = [_Envelop2.default, _CannonBall2.default, _Missile2.default];

// ** Global Functions ** \\
function shootBullet(originX, originY, targetX, targetY, type, flags) {
  var bulletFlags = flags || {};
  var bulletType;

  if (!type) {
    bulletType = handleType();
  } else {
    bulletType = type;
  }
  var thisType = getBulletType(bulletType);

  // Create it
  bullets[bullets.length] = {
    flags: bulletFlags,
    timer: 0
  };
  thisType.create(originX, originY, targetX, targetY, bullets[bullets.length - 1]);
}
function updateBullets(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    var thisType = getBulletType(v.type);

    // Timer
    v.timer += dt;

    // Execute the type update function
    thisType.update(i, v, dt);

    // Going off screen
    if (v.x < 0 || v.y < 0 || v.x > window.innerWidth || v.y > window.innerHeight) {
      v.setToDelete = true;
    }

    // Removing it
    if (v.setToDelete === true) {
      v.el.remove();
      bullets.splice(i, 1);
    }
  }
}

// ** Helper Functions ** \\

// Check for any specified bullet types (ie cannonball powerup)
function handleType() {
  return 'missile';
  // Cannonball
  if (_HandlePowerups.powerupList[5].active) {
    return 'cannonball';

    // Nothing
  } else {
    return 'envelop';
  }
}

// Get a bullet object by it's name
function getBulletType(name) {
  for (var i = 0; i < types.length; i++) {
    var thisType = types[i];
    if (thisType.name === name) {
      return thisType;
    }
  }
}