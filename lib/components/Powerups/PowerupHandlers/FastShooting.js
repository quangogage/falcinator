import { shootBullet } from '../../Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';

var timer = 0;
var shootRate = 15;
export function FastShooting(dt) {
  timer += dt;
  console.log('spawning every 15 milliseconds');
  if (timer >= shootRate) {
    shootBullet(mouseX, mouseY, ship, $('.Game'));
    timer = 0;
  }
}
