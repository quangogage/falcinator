import $ from 'jquery';
import { ShakeCamera } from '../Camera/Camera';
import { HandleBurstShot } from '../Powerups/PowerupHandlers/BurstShot';
import { powerupList } from '../Powerups/HandlePowerups';
import Envelop from './types/Envelop';
export var bullets = [];
var speed = 1;

var types = [Envelop];

// ** Global Functions ** \\
export function shootBullet(originX, originY, targetX, targetY, type, flags) {
  var type = type || 'envelop';
  var thisType = getBulletType(type);

  // Create it
  bullets[bullets.length] = {
    flags: flags
  };
  thisType.create(
    originX,
    originY,
    targetX,
    targetY,
    bullets[bullets.length - 1]
  );
}
export function updateBullets(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    var thisType = getBulletType(v.type);

    // Execute the type update function
    thisType.update(i, v, dt);

    // Going off screen
    if (
      v.x < 0 ||
      v.y < 0 ||
      v.x > window.innerWidth ||
      v.y > window.innerHeight
    ) {
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
