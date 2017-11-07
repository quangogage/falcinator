import { powerupList } from '../HandlePowerups';

export function BurstShot(dt) {}

export function HandleBurstShot(bulletEl, angle, shipX, shipY, shootFunc) {
  var isActive = powerupList[3].active;
  if (isActive) {
    var newAngle = angle * 1.1;
    shootFunc(bulletEl, newAngle, shipX, shipY);
    var newAngle2 = angle * 0.9;
    shootFunc(bulletEl, newAngle2, shipX, shipY);
  }
}
