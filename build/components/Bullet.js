'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shootBullet = shootBullet;
exports.updateBullets = updateBullets;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Camera = require('./Camera/Camera');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bullets = [];
var speed = 1;

// ** Global Functions ** \\
function shootBullet(mouseX, mouseY, ship, world) {
  var bulletEl = (0, _jquery2.default)('<div class=\'bullet\'></div>');
  var shipX = ship.offset().left + ship.width() / 2;
  var shipY = ship.offset().top + ship.height() / 2;
  var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
  var index = bullets.length;

  // Add to array of stored bullets
  bullets[index] = {
    el: bulletEl,
    angle: angle,
    x: shipX,
    y: shipY
  };

  // Position and angle
  bulletEl.css({
    left: shipX,
    top: shipY,
    transform: 'rotate(' + angle + 'rad)'
  });

  // Add to world
  world.append(bulletEl);

  // Shake Camera
  (0, _Camera.ShakeCamera)(20);
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
      top: v.y
    });

    // Delete if it has gone offscreen OR
    // if it has hit the quail (collision detection
    // is handled in Quail.js, sets "setToDelete" to true.)
    if (v.x < 0 || v.y < 0 || v.x > window.innerWidth || v.y > window.innerHeight || v.setToDelete === true) {
      v.el.remove();
      bullets.splice(i, 1);
    }
  }
  return bullets;
}

// ** Helper Functions ** \\