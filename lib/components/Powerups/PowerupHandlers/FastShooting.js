import { shootBullet } from '../../Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';
export function FastShooting(dt) {
  shootBullet(mouseX, mouseY, ship, $('.Game'));
}
