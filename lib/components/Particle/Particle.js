import './styles.css';
import Explosion from './Explosion';
import Dusts from './Dusts';

export function createParticle(x, y, angle) {
  Explosion.play(x, y);
  Dusts.play(x, y, angle);
}

export function updateParticle(dt) {
  Dusts.update(dt);
}
