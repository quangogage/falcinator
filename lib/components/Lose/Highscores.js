import Firebase from 'firebase';
// Executed on lose
export function HandleHighscore() {
  var firebaseRef = new Firebase(
    'https://falcinator-988f4.firebaseio.com/scores'
  );

  // Submit Dummy Score
  firebaseRef.push({ name: 'test score', score: '1250890' });
}
