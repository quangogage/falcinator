import { timer } from './Timer/Timer';
import { TriggerLoseExplosion } from './Particle/LoseExplosion';
import { ship } from './Game';

export var hasLost = false;

export function LoadLose() {
  hasLost = false;
}

// Checking if you've lost
export function UpdateLose(dt) {
  if (!hasLost && timer <= 0) {
    TriggerLose();
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
