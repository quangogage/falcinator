import $ from 'jquery';
import { ShakeCamera } from '../Camera/Camera';
import { HandleBurstShot } from '../Powerups/PowerupHandlers/BurstShot';
import { powerupList } from '../Powerups/HandlePowerups';
import Envelop from './types/Envelop';
export var bullets = [];
var speed = 1;

var types = [Envelop];

// ** Global Functions ** \\
export function shootBullet(originX, originY, targetX, targetY, type) {
  var type = type || 'envelop';
  var thisType = getBulletType(type);

  // Create it
  thisType.create(originX, originY, targetX, targetY);
}
export function updateBullets(dt) {}

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
