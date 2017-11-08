'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bullets = undefined;
exports.shootBullet = shootBullet;
exports.updateBullets = updateBullets;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Camera = require('./Camera/Camera');

var _BurstShot = require('./Powerups/PowerupHandlers/BurstShot');

var _HandlePowerups = require('./Powerups/HandlePowerups');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = exports.bullets = [];
var speed = 1;
var cannonball = require('./cannonball.png');

// ** Global Functions ** \\
function shootBullet(mouseX, mouseY, ship, world) {
  var shootFunc = function shootFunc(angle, shipX, shipY, shakeIntensity) {
    var shakeIntensity = shakeIntensity || 3.2;
    var bulletEl = (0, _jquery2.default)('<div class=\'bullet\'></div>');
    if (_HandlePowerups.powerupList[5].active === true) {
      bulletEl = (0, _jquery2.default)('<img src=' + cannonball + ' class="cannonball"/>');
    }
    var isCannonball = _HandlePowerups.powerupList[5].active ? true : false;
    // Add to array of stored bullets
    bullets[bullets.length] = {
      el: bulletEl,
      angle: angle,
      x: shipX,
      y: shipY,
      isCannonball: isCannonball
    };

    // Position and angle
    bulletEl.css({
      position: 'absolute',
      left: shipX,
      top: shipY,
      transform: 'rotate(' + angle + 'rad)'
    });

    // Add to world
    world.append(bulletEl);

    // Shake Camera
    (0, _Camera.ShakeCamera)(3.2);
  };
  var shipX = ship.offset().left + ship.width() / 2;
  var shipY = ship.offset().top + ship.height() / 2;
  var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
  shootFunc(angle, shipX, shipY);
  (0, _BurstShot.HandleBurstShot)(angle, shipX, shipY, shootFunc);
}
function updateBullets(dt) {
  var i = bullets.length;
  while (i--) {
    var v = bullets[i];
    if (v.deleted) {
      break;
    }
    var el = v.el;
    v.y = v.y + Math.sin(v.angle + Math.PI / 2) * speed * dt;
    v.x = v.x + Math.cos(v.angle + Math.PI / 2) * speed * dt;

    el.css({
      left: v.x,
      top: v.y,
      transform: 'rotate(' + v.angle + 'rad)'
    });

    // Delete if it has gone offscreen OR
    // if it has hit the quail (collision detection
    // is handled in Quail.js, sets "setToDelete" to true.)
    if (v.x < 0 || v.y < 0 || v.x > window.innerWidth || v.y > window.innerHeight) {
      if (_HandlePowerups.powerupList[4].active === false) {
        v.setToDelete = true;
      }
    }
    if (v.setToDelete === true) {
      v.el.remove();
      bullets.splice(i, 1);
    }
  }
  return bullets;
}

// ** Helper Functions ** \\