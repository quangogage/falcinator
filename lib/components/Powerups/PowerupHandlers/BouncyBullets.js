import { bullets } from '../../Bullet';
export function BouncyBullets(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    if (v.x < 10) {
      v.x = 10;
      v.angle += Math.PI;
    }
  }
}
