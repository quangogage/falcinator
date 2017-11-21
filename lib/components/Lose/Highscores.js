import Firebase from 'firebase';
// Executed on lose
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
  // addHighScore('super testing', 5020);
}

// Get an array of every high score
export function getHighScores() {
  var ref = database.ref();
  var scores = [];
  ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
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
