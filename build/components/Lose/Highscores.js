'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandleHighscore = HandleHighscore;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Executed on lose
function HandleHighscore() {
  var config = {
    apiKey: 'AIzaSyBtu5nBaAeIItHuhHRVfp6mXiL9dLpqyLA',
    authDomain: 'falcinator-988f4.firebaseapp.com',
    databaseURL: 'https://falcinator-988f4.firebaseio.com',
    projectId: 'falcinator-988f4',
    storageBucket: 'falcinator-988f4.appspot.com',
    messagingSenderId: '842435348000'
  };
  _firebase2.default.initializeApp(config);

  // Submit Dummy Score
  _firebase2.default.push({ name: 'test score', score: '1250890' });
}