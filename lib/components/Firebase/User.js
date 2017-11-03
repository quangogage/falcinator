// Check for/load username
export function loadUser() {
  var storedName = localStorage.getItem('username');
  if (storedName === null) {
    // You need to set a username
    return prompt('Please enter your name (for high-scores)', 'jimmy john');
  } else {
    return storedName;
  }
}
