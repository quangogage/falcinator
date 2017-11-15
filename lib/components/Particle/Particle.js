import './styles.css';
import Explosion from './Explosion';
import Dusts from './Dusts';
import Smoke from './Smoke';
import { UpdateLoseExplosion } from './LoseExplosion';

export function createParticle(x, y, angle, type) {
  Explosion.play(x, y, angle);
  Dusts.play(x, y, angle);
}

export function updateParticle(dt) {
  Dusts.update(dt);
  Smoke.update(dt);
  UpdateLoseExplosion(dt);
}
