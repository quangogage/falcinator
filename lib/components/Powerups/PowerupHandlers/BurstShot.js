import { powerupList } from '../HandlePowerups';
import { shootBullet } from '../../Bullet';

export function BurstShot(dt) {}

export function HandleBurstShot(e, ship, world) {
  var isActive = powerupList[3].active;
  if (isActive) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI / 2;
    angle += Math.PI * 0.1;
    var newX = shipX + Math.cos(angle) * 50;
    var newY = shipY + Math.sin(angle) * 50;

    shootBullet(newX, newY, ship, world);

    angle = Math.atan2(shipY - e.pageY, shipX - e.pageX) + Math.PI / 2;
    angle -= Math.PI * 0.1;
    newX = shipX + Math.cos(angle) * 50;
    newY = shipY + Math.sin(angle) * 50;

    shootBullet(newX, newY, ship, world);
  }
}
