import { shootBullet } from './Bullet/Bullet';
import { ship } from './Game';

export default function WeaponHandler(mouseX, mouseY) {
  shootBullet(
    ship.offset().left + ship.width() / 2,
    ship.offset().top + ship.height() / 2,
    mouseX,
    mouseY
  );
}
