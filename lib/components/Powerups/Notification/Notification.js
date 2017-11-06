import $ from 'jquery';

var catchphrases = [
  'MAIL dominance!',
  'MAIL, man!',
  'SNAIL MAIL!',
  'Going POSTAL!',
  'MAILSTROM!',
  'MAIL CALL!'
];

var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  fontSize: '3vw',
  color: 'black',
  textShadow: '2px 2px red'
};
export default function CreateNotification() {
  var phrase = catchphrases[0];
  var note = $(`<div class="notification">${phrase}</div>`);
  note.css(styles);
  $('.Game').append(note);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
