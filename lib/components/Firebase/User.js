function loadUser() {
  var storedName = localStorage.getItem('username');
  if (storedName === null) {
    // You need to set a username
    prompt('Please enter your name (for high-scores)');
  } else {
    username = storedName;
  }
}