import { bullets } from '../../Bullet';
export function MailSeek(dt) {
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].angle += 0.05 * dt;
  }
}
