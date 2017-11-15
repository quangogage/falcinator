import $ from 'jquery';
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
    hasLost = true;
  }
}

// Trigger losing stuff
function TriggerLose() {
  TriggerLoseExplosion(
    ship.offset().left + ship.width() / 2,
    ship.offset().top + ship.height() / 2
  );
  ship.remove();
  animateGame();
}

function animateGame() {
  var game = $('.Game');
  game.animate(
    {
      background: 'RGB(200,200,200)'
    },
    {
      duration: 420,
      queue: false,
      complete: function() {
        game.animate(
          {
            background: ''
          },
          { duration: 420, queue: false }
        );
      }
    }
  );
}
