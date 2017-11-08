import { bullets } from '../../Bullet/Bullet';
export function BouncyBullets(dt) {
  for (var i = 0; i < bullets.length; i++) {
    var v = bullets[i];
    if (v.x < 10) {
      v.angle = (v.angle - Math.PI / 2) * -1;
      v.x = 10;
    } else if (v.x > window.innerWidth - 20) {
      v.angle = (v.angle - Math.PI / 2) * -1;
      v.x = window.innerWidth - 20;
    }
    if (v.y < 10) {
      v.angle = v.angle * -2;
      v.y = 10;
    } else if (v.y > window.innerHeight - 20) {
      v.angle = v.angle * -1 - Math.PI;
      v.y = window.innerHeight - 20;
    }
  }
}
