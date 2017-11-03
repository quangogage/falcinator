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
    var name = prompt('Please enter your name (for high-scores). \n Max-length is 20 characters', '');
    if (name > 20) {
      name = name.substr(0, 20);
    }
    localStorage.setItem('username', name);
    return name;
  } else {
    return storedName;
  }
}