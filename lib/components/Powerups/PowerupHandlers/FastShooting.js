import { shootBullet } from '../../Bullet';
import { mouseX, mouseY, ship } from '../../Game';
import $ from 'jquery';
export function FastShooting(dt) {
  console.log('uhh trying to shoot a bullet');
  shootBullet(mouseX, mouseY, ship, $('.Game'));
}
