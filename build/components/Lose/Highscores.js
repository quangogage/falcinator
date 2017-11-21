'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleHighscore = HandleHighscore;
exports.getHighScores = getHighScores;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _LosePromptStyles = require('./LosePromptStyles');

var _LosePromptStyles2 = _interopRequireDefault(_LosePromptStyles);

var _Timer = require('../Timer/Timer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Firebase db config
var config = {
  apiKey: 'AIzaSyBtu5nBaAeIItHuhHRVfp6mXiL9dLpqyLA',
  authDomain: 'falcinator-988f4.firebaseapp.com',
  databaseURL: 'https://falcinator-988f4.firebaseio.com',
  projectId: 'falcinator-988f4',
  storageBucket: 'falcinator-988f4.appspot.com',
  messagingSenderId: '842435348000'
};
_firebase2.default.initializeApp(config);
var database = _firebase2.default.database();
var scores = [];

// Triggered once when you lose
function HandleHighscore() {
  // Submit Dummy Score
  getHighScores();
}

// Get and inject a list of high scores
function getHighScores() {
  var ref = database.ref();
  ref.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;

      // Add to DOM
      (0, _jquery2.default)('.score-list').append('\n        <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n          <div class=\'name\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + name + '</div>\n          <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + score + '</div>\n        </div>\n      ');

      // Add to array
      scores[scores.length] = { score: score, name: name };
      console.log('adding to scores, new amount: ' + scores.length);
    });
    addSubmitScore();
  });
}

// Add your score
function addHighScore(name, time) {
  var scoreRef = database.ref().push();
  scoreRef.set({
    name: name,
    score: time
  });
}

// Add the field to submit your score
function addSubmitScore() {
  var insertIndex;
  var name;
  var submit = function submit() {
    addHighScore(name, _Timer.totalTimer);
  };
  var addNewScore = function addNewScore() {
    scores[scores.length] = { name: name, score: _Timer.totalTimer };

    submit();
  };
  if (scores.length !== 0) {
    for (var i = 0; i <= scores.length - 1; i++) {
      var thisScore = scores[i].score;
      console.log('Comparing score ' + i);
      if (_Timer.totalTimer >= thisScore) {
        insertIndex = i - 1;
      } else if (i === scores.length - 1) {
        insertIndex = scores.length - 1;
      }
    }
  } else {
    console.log('There are no scores!');
    insertIndex = 0;
  }
  console.log('Adding score in list');
  (0, _jquery2.default)('.score').eq(insertIndex).after('\n  <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n    <input type=\'text\' placeholder=\'Enter your name.\' class=\'name textinput\' style="' + _LosePromptStyles2.default['scoreText'] + 'color:black;" />\n    <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + _Timer.totalTimer + '</div>\n  </div>\n  ');
  (0, _jquery2.default)('.textinput').on('keypress', function (e) {
    if (e.keyCode == '13') {
      var setIndex = (0, _jquery2.default)('.textinput').parent().index();
      name = (0, _jquery2.default)('.textinput').val();
      addNewScore();
      (0, _jquery2.default)('.textinput').parent().remove();
      (0, _jquery2.default)('score').eq(setIndex).after('\n      <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n        <div class=\'name\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + name + '</div>\n        <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + _Timer.totalTimer + '</div>\n      </div>\n    ');
    }
  });
}