import $ from 'jquery';
import { timer } from '../Timer/Timer';
import { TriggerLoseExplosion } from '../Particle/LoseExplosion';
import { HandleHighscore } from './Highscores';
import { totalTimer } from '../Timer/Timer';
import { ship } from '../Game';

export var hasLost = false;

export function LoadLose() {
  hasLost = false;
}

// Checking if you've lost
export function UpdateLose(dt) {
  if (!hasLost && timer <= 0) {
    TriggerLose();
    $('#your-score').html('Your score: ' + formatTime(totalTimer));
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
  HandleHighscore();
  setTimeout(function() {
    $('.LosePrompt').css({ display: 'block' });
  }, 2000);
}

function animateGame() {
  $('.Game').css({ transition: 'background 1.25s' });
  $('.Game').css({ backgroundColor: 'RGB(50,50,50)' });
  setTimeout(function() {
    $('.Game').css({ transition: 'background 4s' });
    $('.Game').css({ backgroundColor: '' });
  }, 1250);
}

function formatTime(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
