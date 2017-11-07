import { powerupList } from '../HandlePowerups';

export function BurstShot(dt) {}

export function HandleBurstShot(angle, shipX, shipY, shootFunc) {
  var isActive = powerupList[3].active;
  if (isActive) {
    var newAngle = angle + Math.PI * 0.1;
    shootFunc(newAngle, shipX, shipY);
    var newAngle2 = angle + Math.PI * -0.1;
    shootFunc(newAngle2, shipX, shipY);
  }
}
