import { quails } from '../Quail/Quail';
import { shootBullet } from '../Bullet/Bullet';
import { CreateFlash } from '../Flash';

var burstTime = 500;
var shootTime = 100;

export default function UpdateAttacking(v, dt) {
  var targetQuail = quails[quails.length - 1];

  // Targeting
  if (targetQuail.dir === 1) {
    v.target.x = targetQuail.x + targetQuail.el.width();
  } else {
    v.target.x = targetQuail.x - targetQuail.el.width();
  }
  v.target.y = targetQuail.y - targetQuail.el.height() / 2;

  //Shooting
  v.burstTimer += dt;
  if (v.burstTimer >= burstTime) {
    v.shootTimer += dt;
    if (v.shootTimer >= shootTime) {
      if (v.shotCount < 3) {
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
        v.shotCount += 1;
      } else {
        v.shotCount = 0;
        v.burstTimer = 0;
      }
      v.shootTimer = 0;
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
