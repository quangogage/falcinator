'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleHighscore = HandleHighscore;
exports.getHighScores = getHighScores;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Executed on lose
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
function HandleHighscore() {}
// Submit Dummy Score
// addHighScore('super testing', 5020);


// Get an array of every high score
function getHighScores() {
  var ref = database.ref();
  var scores = [];
  ref.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;
      scores.push({ score: score, name: name });
    });
  });
  return scores;
}

// Add a high score
function addHighScore(name, time) {
  var scoreRef = database.ref().push();
  scoreRef.set({
    name: name,
    score: time
  });
}