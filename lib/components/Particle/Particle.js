import './styles.css';
import Explosion from './Explosion';
import Dusts from './Dusts';
import Smoke from './Smoke';

export function createParticle(x, y, angle, type) {
  Explosion.play(x, y);
  Dusts.play(x, y, angle);
}

export function updateParticle(dt) {
  Dusts.update(dt);
  Smoke.update(dt);
}
