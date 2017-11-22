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
  // Submit Dummy Score
  getHighScores();
}

// Get and inject a list of high scores
export function getHighScores() {
  var ref = database.ref();

  // Call to database root
  ref.once('value', function(snapshot) {
    // Iterate through all children
    snapshot.forEach(function(childSnapshot) {
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
    scores.sort(function(a, b) {
      return b.score - a.score;
    });

    // Iterate through newly sorted scores and add them to DOM
    for (var i = 0; i < scores.length; i++) {
      var name = scores[i].name;
      var score = scores[i].score;
      // Add to DOM
      $('.score-list').append(`
        <div class='score' style="${LosePromptStyles['score']}">
          <div class='name' style="${LosePromptStyles['scoreText']}">${i +
        1}. ${name}</div>
          <div class='time' style="${LosePromptStyles[
            'scoreText'
          ]}">${formatTime(score)}</div>
        </div>
      `);
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
  var submit = function() {
    addHighScore(name, totalTimer);
  };
  var addNewScore = function() {
    scores[scores.length] = { name: name, score: totalTimer };

    submit();
  };
  if (scores.length !== 0) {
    for (var i = 0; i <= scores.length - 1; i++) {
      var thisScore = scores[i].score;
      console.log('Comparing score ' + i);
      if (totalTimer >= thisScore) {
        insertIndex = i - 1;
        $('.score')
          .eq(i)
          .remove();
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
  <div class='score' id="new-score" style="${LosePromptStyles['score']}">
    <input type='text' placeholder='Enter your name.' class='name textinput' style="${LosePromptStyles[
      'scoreText'
    ]}color:black;" />
    <div class='time' style="${LosePromptStyles['scoreText']}">${formatTime(
    totalTimer
  )}</div>
  </div>
  `);
  $('.textinput').on('keypress', function(e) {
    if (e.keyCode == '13') {
      var setIndex = $('.textinput')
        .parent()
        .index();
      name = $('.textinput').val();
      addNewScore();
      console.log(setIndex);
      $('#new-score').replaceWith(`
      <div class='score' style="${LosePromptStyles['score']}">
        <div class='name' style="${LosePromptStyles['scoreText']}">${name}</div>
        <div class='time' style="${LosePromptStyles['scoreText']}">${formatTime(
        totalTimer
      )}</div>
      </div>
      `);
      checkMaxScores();
    }
  });
}

// Handle the high score list if there are more than 10 entries
function checkMaxScores() {
  if (scores.length > 10) {
    for (var i = 0; i < scores.length; i++) {
      var thisScore = scores[i];
      if (i >= 8) {
        database
          .ref()
          .child(thisScore.snapshot.key)
          .remove();
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
