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
  var firebaseRef = new _firebase2.default('https://falcinator-988f4.firebaseio.com/scores');

  // Submit Dummy Score
  firebaseRef.push({ name: 'test score', score: '1250890' });
}