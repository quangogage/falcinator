import { powerupList } from '../HandlePowerups';
import { shootBullet } from '../../Bullet';

export function BurstShot(dt) {}

export function HandleBurstShot(e, ship, world) {
  var isActive = powerupList[3].active;
  if (isActive) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI * 1.1;
    angle += Math.PI * 0;
    var newX = shipX + Math.cos(angle) * 50;
    var newY = shipY + Math.sin(angle) * 50;

    shootBullet(newX, newY, ship, world);

    var angle2 = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI * 0.9;
    var newX2 = shipX + Math.cos(angle2) * 50;
    var newY2 = shipY + Math.sin(angle2) * 50;

    shootBullet(newX2, newY2, ship, world);
  }
}
