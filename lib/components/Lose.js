import { timer } from './Timer/Timer';
import { hasLost } from './Game';
import { TriggerLoseExplosion } from './Particle/LoseExplosion';
import ship from './Game';

// Checking if you've lost
export function UpdateLose(dt) {
  if (!hasLost && timer <= 0) {
    TriggerLose();
    hasLost = true;
  }
}

// Trigger losing stuff
function TriggerLose() {
  TriggerLoseExplosion(
    ship.el.offset().left + ship.el.width() / 2,
    ship.el.offset().top + ship.el.height() / 2
  );
  ship.el.remove();
}
