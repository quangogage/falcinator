import { bullets, shootBullet } from '../../Bullet/Bullet';
import { mouseX, mouseY, ship } from '../../Game';

export function BurstShot(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    if (!v.burstShot && !v.flags.burst) {
      var angle1 = v.angle;
      var x1 = v.x + Math.cos(v.angle) * 10;
      var y1 = v.y + Math.sin(v.angle) * 10;
      shootBullet(v.x, v.y, x1, y1, null, { burst: true });

      v.burstShot = true;
    }
  }
}
