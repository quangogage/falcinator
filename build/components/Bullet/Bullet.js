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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = exports.bullets = [];
var speed = 1;

var types = [_Envelop2.default];

// ** Global Functions ** \\
function shootBullet(originX, originY, targetX, targetY, type) {
  var type = type || 'envelop';
  var thisType = getBulletType(type);

  // Create it
  thisType.create(originX, originY, targetX, targetY);
}
function updateBullets(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    var thisType = getBulletType(v.type);

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

// Get a bullet object by it's name
function getBulletType(name) {
  for (var i = 0; i < types.length; i++) {
    var thisType = types[i];
    if (thisType.name === name) {
      return thisType;
    }
  }
}