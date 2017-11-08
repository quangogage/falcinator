import { shootBullet } from '../../Bullet/Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';

var timer = 0;
var shootRate = 60;
export function FastShooting(dt) {
  timer += dt;
  if (timer >= shootRate) {
    shootBullet(
      ship.offset().left + ship.width() / 2,
      ship.offset().top + ship.height() / 2,
      mouseX,
      mouseY
    );
    timer = 0;
  }
}
