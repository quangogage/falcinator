import $ from 'jquery';

var el;
var score = 0;
var highScore = localStorage.getItem('highscore') || 0;
var highScoreEl;
var hasBrokenScore = true; // For displaying high score gifs.
export function loadScore() {
  el = $(`<div class="score">Score: ${score}</div>`);
  el.css({
    position: 'absolute',
    left: 50,
    bottom: 50,
    fontFamily: 'score',
    fontSize: '25px',
    display: 'none'
  });
  highScoreEl = $(`<div class='highscore'>Highscore: ${highScore}</div>`);
  checkHighScore();
  $('.Game').append(el, highScoreEl);
  highScoreEl.css({ top: el.offset().top + el.height(), left: 50 });
}
export function addScore() {
  score++;
  el.html('Score: ' + score);
  createScoreMarker('+1', 'add');
  checkHighScore();
}

export function subtractScore() {
  score--;
  el.html('Score: ' + score);
  createScoreMarker('-1', 'subtract');
  checkHighScore();
}

function createScoreMarker(html, className) {
  var x = $('.score').offset().left + $('.score').width();
  var y = $('.score').offset().top;
  var marker = $(`<div class="score-marker ${className}">${html}</div>`);
  marker.css({
    left: x - 50,
    top: y,
    opacity: 0
  });
  $('.Game').append(marker);
  marker.animate(
    {
      left: x + 10,
      top: y,
      opacity: 1
    },
    {
      duration: 500,
      queue: false,
      complete: function() {
        setTimeout(function() {
          marker.animate(
            { left: x + 10, top: y + 100 },
            {
              duration: 500,
              queue: false,
              complete: function() {
                marker.remove();
              }
            }
          );
        }, 250);
      }
    }
  );
}

function checkHighScore() {
  // Create a highscore if there isn't one
  checkBrokenScore(score, highScore);
  if (localStorage.getItem('highscore') === null) {
    localStorage.setItem('highscore', '0');
    highScoreEl.html('Highscore: ' + highScore);
  }
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highscore', score.toString());
    highScoreEl.html('Highscore: ' + highScore);
  }
}

function checkBrokenScore() {
  if (score > highScore && !hasBrokenScore) {
    highScoreAlert();
    hasBrokenScore = true;
  }
  if (score < highScore - 1) {
    hasBrokenScore = false;
  }
}

var gifs = [
  require('./gifs/1.gif'),
  require('./gifs/2.gif'),
  require('./gifs/3.gif'),
  require('./gifs/4.gif'),
  require('./gifs/5.gif')
];
function highScoreAlert() {
  var gif = $(
    `<img src=${gifs[Math.floor(getRandom(0, gifs.length - 1))]} class='gif' />`
  );
  gif.css({
    position: 'absolute',
    width: '200px',
    right: -200,
    bottom: 50
  });
  $('.Game').append(gif);
  gif.animate(
    {
      right: 50
    },
    {
      duration: 500,
      queue: false,
      complete: function() {
        setTimeout(function() {
          gif.animate(
            {
              right: -200
            },
            {
              duration: 500,
              queue: false,
              complete: function() {
                gif.remove();
              }
            }
          );
        }, 1500);
      }
    }
  );
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
