import Firebase from 'firebase';
import $ from 'jquery';
import LosePromptStyles from './LosePromptStyles';
import { totalTimer } from '../Timer/Timer';

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
var scores = [];

// Triggered once when you lose
export function HandleHighscore() {
  addHighScore('testing', 1000);
  // Submit Dummy Score
  getHighScores();
}

// Get and inject a list of high scores
export function getHighScores() {
  var ref = database.ref();
  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var score = childSnapshot.val().score;
      var name = childSnapshot.val().name;

      // Add to DOM
      $('.score-list').append(`
        <div class='score' style="${LosePromptStyles['score']}">
          <div class='name' style="${LosePromptStyles[
            'scoreText'
          ]}">${name}</div>
          <div class='time' style="${LosePromptStyles[
            'scoreText'
          ]}">${score}</div>
        </div>
      `);

      // Add to array
      scores[scores.length] = { score: score, name: name };
      console.log('adding to scores, new amount: ' + scores.length);
    });
    addSubmitScore();
    ref.remove();
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
  var submit = function() {
    for (var i = 0; i < scores.length; i++) {
      addHighScore(scores[i].name, scores[i].score);
    }
  };
  var addNewScore = function() {
    var name = $('.textinput').val();
    scores[scores.length] = { name: name, score: totalTimer };

    submit();
  };
  if (scores.length !== 0) {
    for (var i = 0; i <= scores.length - 1; i++) {
      var thisScore = scores[i].score;
      console.log('Comparing score ' + i);
      if (totalTimer >= thisScore) {
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
  $('.score').eq(insertIndex).after(`
  <div class='score' style="${LosePromptStyles['score']}">
    <input type='text' placeholder='Enter your name.' class='name textinput' style="${LosePromptStyles[
      'scoreText'
    ]}color:black;" />
    <div class='time' style="${LosePromptStyles[
      'scoreText'
    ]}">${totalTimer}</div>
  </div>
  `);
  $('.textinput').on('keypress', function(e) {
    if (e.keyCode == '13') {
      addNewScore();
    }
  });
}
