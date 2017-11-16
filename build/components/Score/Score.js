'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadScore = loadScore;
exports.addScore = addScore;
exports.subtractScore = subtractScore;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var el;
var score = 0;
var highScore = localStorage.getItem('highscore') || 0;
var highScoreEl;
var hasBrokenScore = true; // For displaying high score gifs.
function loadScore() {
  el = (0, _jquery2.default)('<div class="score">Score: ' + score + '</div>');
  el.css({
    position: 'absolute',
    left: 50,
    bottom: 50,
    fontFamily: 'score',
    fontSize: '25px',
    display: 'none'
  });
  highScoreEl = (0, _jquery2.default)('<div class=\'highscore\'>Highscore: ' + highScore + '</div>');
  checkHighScore();
  (0, _jquery2.default)('.Game').append(el, highScoreEl);
  highScoreEl.css({
    top: el.offset().top + el.height(),
    left: 50,
    display: 'none'
  });
}
function addScore() {
  score++;
  el.html('Score: ' + score);
  createScoreMarker('+1', 'add');
  checkHighScore();
}

function subtractScore() {
  score--;
  el.html('Score: ' + score);
  createScoreMarker('-1', 'subtract');
  checkHighScore();
}

function createScoreMarker(html, className) {
  var x = (0, _jquery2.default)('.score').offset().left + (0, _jquery2.default)('.score').width();
  var y = (0, _jquery2.default)('.score').offset().top;
  var marker = (0, _jquery2.default)('<div class="score-marker ' + className + '">' + html + '</div>');
  marker.css({
    left: x - 50,
    top: y,
    opacity: 0
  });
  (0, _jquery2.default)('.Game').append(marker);
  marker.animate({
    left: x + 10,
    top: y,
    opacity: 1
  }, {
    duration: 500,
    queue: false,
    complete: function complete() {
      setTimeout(function () {
        marker.animate({ left: x + 10, top: y + 100 }, {
          duration: 500,
          queue: false,
          complete: function complete() {
            marker.remove();
          }
        });
      }, 250);
    }
  });
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

var gifs = [require('./gifs/1.gif'), require('./gifs/2.gif'), require('./gifs/3.gif'), require('./gifs/4.gif'), require('./gifs/5.gif')];
function highScoreAlert() {
  var gif = (0, _jquery2.default)('<img src=' + gifs[Math.floor(getRandom(0, gifs.length - 1))] + ' class=\'gif\' />');
  gif.css({
    position: 'absolute',
    width: '200px',
    right: -200,
    bottom: 50
  });
  (0, _jquery2.default)('.Game').append(gif);
  gif.animate({
    right: 50
  }, {
    duration: 500,
    queue: false,
    complete: function complete() {
      setTimeout(function () {
        gif.animate({
          right: -200
        }, {
          duration: 500,
          queue: false,
          complete: function complete() {
            gif.remove();
          }
        });
      }, 1500);
    }
  });
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}