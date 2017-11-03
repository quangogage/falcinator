// Check for/load username
export function loadUser() {
  var storedName = localStorage.getItem('username');
  if (storedName === null) {
    // You need to set a username
    var name = prompt('Please enter your name (for high-scores)', '');
    localStorage.setItem('username', name);
    return name;
  } else {
    return storedName;
  }
}
