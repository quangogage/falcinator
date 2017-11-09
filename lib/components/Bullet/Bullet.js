import $ from 'jquery';
import { ShakeCamera } from '../Camera/Camera';
import { HandleBurstShot } from '../Powerups/PowerupHandlers/BurstShot';
import { powerupList } from '../Powerups/HandlePowerups';
import Envelop from './types/Envelop';
import CannonBall from './types/CannonBall';
import Missile from './types/Missile';
export var bullets = [];

var types = [Envelop, CannonBall, Missile];

var maxAmount = 50; // How many can exist at one time?

// ** Global Functions ** \\
export function shootBullet(originX, originY, targetX, targetY, type, flags) {
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

    // Timer
    v.timer += dt;

    // Execute the type update function
    thisType.update(i, v, dt);

    // Going off screen
    if (
      v.x < 0 ||
      v.y < 0 ||
      v.x > window.innerWidth ||
      v.y > window.innerHeight
    ) {
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

// ** Helper Functions ** \\

// Check for any specified bullet types (ie cannonball powerup)
function handleType() {
  return 'missile';
  // Cannonball
  if (powerupList[5].active) {
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
