'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitScore = submitScore;

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myFirebase = (0, _firebase2.default)('https://falcinator-988f4.firebaseio.com/');
var database = _firebase2.default.database();

// Submit a score to the database
function submitScore(username, score) {
  var newScore = {};
}

// Check if a score is better than the persons last
function scoreExists(username) {}