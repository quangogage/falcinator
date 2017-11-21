import Firebase from 'firebase';
import $ from 'jquery';
import LosePromptStyles from './LosePromptStyles';

// Firebase db config
var config = {
  apiKey: 'AIzaSyBtu5nBaAeIItHuhHRVfp6mXiL9dLpqyLA',
  authDomain: 'falcinator-988f4.firebaseapp.com',
  databaseURL: 'https://falcinator-988f4.firebaseio.com',
  projectId: 'falcinator-988f4',
  storageBucket: 'falcinator-988f4.appspot.com',
  messagingSenderId: '842435348000'
};
Firebase.initializeApp(config);
var database = Firebase.database();

// Triggered once when you lose
export function HandleHighscore() {
  // Submit Dummy Score
  getHighScores();
}

// Get and inject a list of high scores
export function getHighScores() {
  var ref = database.ref();
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;
      $('.score-list').append(`
        <div class='score' style="${LosePromptStyles['score']}">
          <div class='name'>${name}</div>
          <div class='time'>${score}</div>
        </div>
      `);
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
