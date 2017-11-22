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

  // Call to database root
  ref.once('value', function (snapshot) {
    // Iterate through all children
    snapshot.forEach(function (childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;

      // Store child values in `scores` array.
      scores[scores.length] = {
        score: score,
        name: name,
        snapshot: childSnapshot
      };
    });

    // Sort high scores (descending)
    scores.sort(function (a, b) {
      return b.score - a.score;
    });

    // Iterate through newly sorted scores and add them to DOM
    for (var i = 0; i < scores.length; i++) {
      var name = scores[i].name;
      var score = scores[i].score;
      // Add to DOM
      (0, _jquery2.default)('.score-list').append('\n        <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n          <div class=\'name\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + (i + 1) + '. ' + name + '</div>\n          <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + formatTime(score) + '</div>\n        </div>\n      ');
    }

    // Creates a score field with a textinput field for your name.
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
      if (_Timer.totalTimer >= thisScore && !insertIndex) {
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
  (0, _jquery2.default)('.score').eq(insertIndex).after('\n  <div class=\'score\' id="new-score" style="' + _LosePromptStyles2.default['score'] + '">\n    <input type=\'text\' placeholder=\'Enter your name.\' class=\'name textinput\' style="' + _LosePromptStyles2.default['scoreText'] + 'color:black;" />\n    <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + formatTime(_Timer.totalTimer) + '</div>\n  </div>\n  ');
  checkMaxScores();
  (0, _jquery2.default)('.textinput').on('keypress', function (e) {
    if (e.keyCode == '13') {
      var setIndex = (0, _jquery2.default)('.textinput').parent().index();
      name = (0, _jquery2.default)('.textinput').val();
      addNewScore();
      console.log(setIndex);
      (0, _jquery2.default)('#new-score').replaceWith('\n      <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n        <div class=\'name\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + insertIndex + '. ' + name + '</div>\n        <div class=\'time\' style="' + _LosePromptStyles2.default['scoreText'] + '">' + formatTime(_Timer.totalTimer) + '</div>\n      </div>\n      ');
    }
  });
}

// Handle the high score list if there are more than 10 entries
function checkMaxScores() {
  if (scores.length > 10) {
    for (var i = 0; i < scores.length; i++) {
      var thisScore = scores[i];
      if (i >= 8) {
        database.ref().child(thisScore.snapshot.key).remove();
        scores.splice(i, 1);
      }
    }
  }
}

// Format total time n shit
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