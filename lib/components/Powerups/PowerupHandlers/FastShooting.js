import { shootBullet } from '../../Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';

var timer = 0;
var shootRate = 15;
export function FastShooting(dt) {
  timer += dt;
  if (timer >= shootRate) {
    shootBullet(mouseX, mouseY, ship, $('.Game'));
    timer = 0;
  }
}
