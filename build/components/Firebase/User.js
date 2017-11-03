'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUser = loadUser;
// Check for/load username
function loadUser() {
  var storedName = localStorage.getItem('username');
  if (storedName === null) {
    // You need to set a username
    return prompt('Please enter your name (for high-scores)', 'jimmy john');
  } else {
    return storedName;
  }
}