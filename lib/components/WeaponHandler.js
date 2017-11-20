import { shootBullet } from './Bullet/Bullet';
import { ship } from './Game';
import { hasLost } from './Lose/Lose';

export default function WeaponHandler(mouseX, mouseY) {
  if (!hasLost) {
    shootBullet(
      ship.offset().left + ship.width() / 2,
      ship.offset().top + ship.height() / 2,
      mouseX,
      mouseY
    );
  }
}
