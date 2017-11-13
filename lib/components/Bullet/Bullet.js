import $ from 'jquery';
import { ShakeCamera } from '../Camera/Camera';
import { HandleBurstShot } from '../Powerups/PowerupHandlers/BurstShot';
import { powerupList } from '../Powerups/HandlePowerups';
import Envelop from './types/Envelop';
import CannonBall from './types/CannonBall';
import Missile from './types/Missile';
export var bullets = [];

var types = [Envelop, CannonBall, Missile];

// Adjustable Variables
var maxAmount = 50; // How many can exist at one time?
var camShake = 50; // How much does the camera shake when you shoot?

// ** Global Functions ** \\
export function shootBullet(originX, originY, targetX, targetY, type, flags) {
  var shootFunc = function(originX, originY, targetX, targetY, type, flags) {
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
    thisType.create(
      originX,
      originY,
      targetX,
      targetY,
      bullets[bullets.length - 1]
    );

    // Shake the camera
    ShakeCamera(camShake);
  };

  // If a type was specified, don't do any fancy jazz
  if (type || checkForSpecialBullet() === false) {
    shootFunc(originX, originY, targetX, targetY, type, flags);
  } else {
    handlePowerupShot(function(powerupType) {
      shootFunc(originX, originY, targetX, targetY, powerupType, flags);
    });
  }
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

function checkForSpecialBullet() {
  if (powerupList[5].active) {
    return true;
  } else if (powerupList[6].active) {
    return true;
  } else {
    return false;
  }
}

var bulletPowerups = [
  {
    name: 'cannonball',
    index: 5
  },
  {
    name: 'missile',
    index: 6
  }
];
var currentShot = 0;
function handlePowerupShot(shoot) {
  var active = [];
  for (var i = 0; i < bulletPowerups.length; i++) {
    if (powerupList[bulletPowerups[i].index].active) {
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
