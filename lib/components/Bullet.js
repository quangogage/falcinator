import $ from 'jquery';
import { ShakeCamera } from './Camera/Camera';
import { HandleBurstShot } from './Powerups/PowerupHandlers/BurstShot';
import { powerupList } from './Powerups/HandlePowerups';
export var bullets = [];
var speed = 1;
var cannonball = require('./cannonball.png');

// ** Global Functions ** \\
export function shootBullet(mouseX, mouseY, ship, world) {
  if (powerupList[5].active === false) {
    var shootFunc = function(angle, shipX, shipY, shakeIntensity) {
      var shakeIntensity = shakeIntensity || 3.2;
      var bulletEl = $(`<div class='bullet'></div>`);
      // Add to array of stored bullets
      bullets[bullets.length] = {
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
      ShakeCamera(3.2);
    };
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
    shootFunc(angle, shipX, shipY);
    HandleBurstShot(angle, shipX, shipY, shootFunc);
  }
}
export function updateBullets(dt) {
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
    if (
      v.x < 0 ||
      v.y < 0 ||
      v.x > window.innerWidth ||
      v.y > window.innerHeight
    ) {
      if (powerupList[4].active === false) {
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
