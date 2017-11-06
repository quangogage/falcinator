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
  top: '33%',
  left: 0,
  fontSize: '3vw',
  color: 'black',
  textShadow: '2px 2px red',
  transform: 'scale(0)',
  transition: '0.5s'
};
export default function CreateNotification() {
  var phrase = catchphrases[0];
  var note = $(`<div class="notification">${phrase}</div>`);
  note.css(styles);
  $('.Game').append(note);

  // Animation
  phrase.css({
    transform: 'scale(1)'
  });
  setTimeout(function() {
    phrase.css({
      transform: 'scale(1) translateY(100vh)'
    });
    setTimeout(function() {
      phrase.remove();
    }, 500);
  }, 1500);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
