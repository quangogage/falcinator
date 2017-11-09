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

var types = [_Envelop2.default, _CannonBall2.default, _Missile2.default];

var maxAmount = 50; // How many can exist at one time?
var activeTypes = [];

// ** Global Functions ** \\
function shootBullet(originX, originY, targetX, targetY, type, flags) {
  var shootFunc = function shootFunc(originX, originY, targetX, targetY, type, flags) {
    var bulletFlags = flags || {};
    var bulletType;

    if (!type) {
      bulletType = 'envelop';
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
  };

  // If a type was specified, don't do any fancy jazz
  if (type || activeTypes.length === 0) {
    shootFunc(originX, originY, targetX, targetY, type, flags);
  } else {
    console.log(activeTypes);
  }
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
      if (v.type !== 'missile') {
        v.setToDelete = true;
      }
    }

    // Removing it
    if (v.setToDelete === true) {
      v.el.remove();
      bullets.splice(i, 1);
    }
  }
  // Limit the amount that can exist at once
  if (bullets.length >= maxAmount) {
    bullets[bullets.length - 1].setToRemove = true;
  }

  // Keep track of currently active bullet types
  handleType();
}

// ** Helper Functions ** \\

// Check for any specified bullet types (ie cannonball powerup)
function handleType() {
  if (_HandlePowerups.powerupList[5].active) {
    if (checkForType('cannonball') === false) {
      activeTypes[activeTypes.length] = 'cannonball';
    }
  } else if (_HandlePowerups.powerupList[6].active) {
    if (checkForType('missile') === false) {
      activeTypes[activeTypes.length] = 'missile';
    }
  }
}
function checkForType(name) {
  for (var i = 0; i < activeTypes.length; i++) {
    if (activeTypes[i] === name) {
      return true;
    } else if (i === activeTypes.length - 1) {
      return false;
    }
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