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

// Triggered once when you lose
function HandleHighscore() {
  // Submit Dummy Score
  getHighScores();
}

// Get and inject a list of high scores
function getHighScores() {
  var ref = database.ref();
  ref.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;
      (0, _jquery2.default)('.score-list').append('\n        <div class=\'score\' style="' + _LosePromptStyles2.default['score'] + '">\n          <div class=\'name\'>' + name + '</div>\n          <div class=\'time\'>' + score + '</div>\n        </div>\n      ');
    });
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