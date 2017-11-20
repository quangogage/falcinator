import $ from 'jquery';
import { timer } from '../Timer/Timer';
import { TriggerLoseExplosion } from '../Particle/LoseExplosion';
import { ship } from '../Game';

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
  setTimeout(function() {
    $('.LosePrompt').css({ display: 'block' });
  }, 1500);
}

function animateGame() {
  $('.Game').css({ transition: 'background 1.25s' });
  $('.Game').css({ backgroundColor: 'RGB(50,50,50)' });
  setTimeout(function() {
    $('.Game').css({ transition: 'background 4s' });
    $('.Game').css({ backgroundColor: '' });
  }, 1250);
}
