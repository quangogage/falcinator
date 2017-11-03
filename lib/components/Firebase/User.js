// Check for/load username
export default function loadUser() {
  var storedName = localStorage.getItem('username');
  if (storedName === null) {
    // You need to set a username
    prompt('Please enter your name (for high-scores)');
  } else {
    return storedName;
  }
}
