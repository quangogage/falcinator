import { bullets, shootBullet } from '../../Bullet/Bullet';
import { mouseX, mouseY, ship } from '../../Game';

export function BurstShot(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    if (!v.burstShot && !v.flags.burst) {
      var angle1 = v.angle + Math.PI * 0.1;
      var x1 = v.x + Math.cos(angle1) * 10;
      var y1 = v.y + Math.sin(angle1) * 10;
      shootBullet(v.x, v.y, x1, y1, null, { burst: true });

      var angle2 = v.angle - Math.PI * 0.1;
      var x2 = v.x + Math.cos(angle2) * 10;
      var y2 = v.y + Math.sin(angle2) * 10;
      shootBullet(v.x, v.y, x2, y2, null, { burst: true });

      v.burstShot = true;
    }
  }
}
