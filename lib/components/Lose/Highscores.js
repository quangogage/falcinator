import Firebase from 'firebase';
// Executed on lose
export function HandleHighscore() {
  var config = {
    apiKey: 'AIzaSyBtu5nBaAeIItHuhHRVfp6mXiL9dLpqyLA',
    authDomain: 'falcinator-988f4.firebaseapp.com',
    databaseURL: 'https://falcinator-988f4.firebaseio.com',
    projectId: 'falcinator-988f4',
    storageBucket: 'falcinator-988f4.appspot.com',
    messagingSenderId: '842435348000'
  };
  Firebase.initializeApp(config);

  // Submit Dummy Score
  Firebase.push({ name: 'test score', score: '1250890' });
}
