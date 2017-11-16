import { quails } from '../Quail/Quail';
import { shootBullet } from '../Bullet/Bullet';
import { CreateFlash } from '../Flash';
import { powerupList } from '../Powerups/HandlePowerups';

var burstTime = 500;
var shootTime = 100;
var fastShootRate = 50;
var shootAngleRange = 0.6;

export default function UpdateAttacking(i, v, dt) {
  var targetQuail = quails[quails.length - 1];
  if (quails[quails.length - 1 - i]) {
    targetQuail = quails[quails.length - 1 - i];
  }

  // Targeting
  if (targetQuail.dir === 1) {
    v.target.x = targetQuail.x + targetQuail.el.width() * 2;
  } else {
    v.target.x = targetQuail.x - targetQuail.el.width();
  }
  v.target.y = targetQuail.y + targetQuail.el.height() / 2;

  //Shooting
  var targetAngle = Math.atan2(v.y - v.target.y, v.x - v.target.x) + Math.PI;
  var angleDiff = targetAngle - v.angle;
  if (powerupList[0].active) {
    v.shootTimer += dt;
    if (v.shootTimer >= fastShootRate) {
      shootBullet(
        v.x + Math.cos(v.angle) * v.el.width() * 0.6,
        v.y + Math.sin(v.angle) * v.el.width() * 0.6,
        v.x + Math.cos(v.angle) * v.el.width(),
        v.y + Math.sin(v.angle) * v.el.width()
      );
      CreateFlash(
        v.x + Math.cos(v.angle) * v.el.width(),
        v.y + Math.sin(v.angle) * v.el.width()
      );
      v.shootTimer = 0;
    }
  } else {
    if (Math.abs(angleDiff) <= shootAngleRange) {
      v.burstTimer += dt;
      if (v.burstTimer >= burstTime) {
        v.shootTimer += dt;
        if (v.shootTimer >= shootTime) {
          if (v.shotCount < 3) {
            var orX = v.x + Math.cos(v.angle) * v.el.width() * 0.6;
            var orY = v.y + Math.sin(v.angle) * v.el.width() * 0.6;
            var bulletX = orX + Math.cos(-Math.PI / 2) * 10;
            var bulletY = orY + Math.sin(-Math.PI / 2) * 10;
            shootBullet(
              bulletX,
              bulletY,
              bulletX + Math.cos(v.angle) * 10,
              bulletY + Math.sin(v.angle) * 10
            );
            CreateFlash(
              v.x + Math.cos(v.angle) * v.el.width(),
              v.y + Math.sin(v.angle) * v.el.width()
            );
            v.shotCount += 1;
          } else {
            v.shotCount = 0;
            v.burstTimer = 0;
          }
          v.shootTimer = 0;
        }
      }
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
