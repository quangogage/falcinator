'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullets = undefined;
exports.shootBullet = shootBullet;
exports.updateBullets = updateBullets;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

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

// Adjustable Variables
var maxAmount = 50; // How many can exist at one time?

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
  if (type || checkForSpecialBullet() === false) {
    shootFunc(originX, originY, targetX, targetY, type, flags);
  } else {
    handlePowerupShot(function (powerupType) {
      shootFunc(originX, originY, targetX, targetY, powerupType, flags);
    });
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
}

function checkForSpecialBullet() {
  if (_HandlePowerups.powerupList[5].active) {
    return true;
  } else if (_HandlePowerups.powerupList[6].active) {
    return true;
  } else {
    return false;
  }
}

var bulletPowerups = [{
  name: 'cannonball',
  index: 5
}, {
  name: 'missile',
  index: 6
}];
var currentShot = 0;
function handlePowerupShot(shoot) {
  var active = [];
  for (var i = 0; i < bulletPowerups.length; i++) {
    if (_HandlePowerups.powerupList[bulletPowerups[i].index].active) {
      active[active.length] = bulletPowerups[i].name;
    }
  }

  if (active.length === 1) {
    shoot(active[0]);
  } else {
    if (currentShot >= active.length) {
      currentShot = 0;
    }
    shoot(active[currentShot]);
    if (currentShot === active.length) {
      currentShot = 0;
    } else {
      currentShot++;
    }
  }
}

// ** Helper Functions ** \\

// Get a bullet object by it's name
function getBulletType(name) {
  for (var i = 0; i < types.length; i++) {
    var thisType = types[i];
    if (thisType.name === name) {
      return thisType;
    }
  }
}