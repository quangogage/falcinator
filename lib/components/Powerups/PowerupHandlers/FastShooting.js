import { shootBullet } from '../../Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';

var timer = 0;
var shootRate = 60;
export function FastShooting(dt) {
  timer += dt;
  if (timer >= shootRate) {
    shootBullet(
      mouseX,
      mouseY,
      ship.el.offset().left + ship.el.width() / 2,
      ship.el.offset().top + ship.el.height() / 2,
      $('.Game'),
      10
    );
    timer = 0;
  }
}
