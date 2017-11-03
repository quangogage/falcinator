import Firebase from 'firebase';
var myFirebase = Firebase('https://falcinator-988f4.firebaseio.com/');
var database = Firebase.database();

// Submit a score to the database
export function submitScore(username, score) {
  var newScore = {};
}

// Check if a score is better than the persons last
function scoreExists(username) {}
