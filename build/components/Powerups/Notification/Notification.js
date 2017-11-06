'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CreateNotification;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var catchphrases = ['MAIL dominance!', 'MAIL, man!', 'SNAIL MAIL!', 'Going POSTAL!', 'MAILSTROM!', 'MAIL CALL!'];

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
function CreateNotification() {
  var phrase = catchphrases[0];
  var note = (0, _jquery2.default)('<div class="notification">' + phrase + '</div>');
  note.css(styles);
  (0, _jquery2.default)('.Game').append(note);

  // Animation
  phrase.css({
    transform: 'scale(1)'
  });
  setTimeout(function () {
    phrase.css({
      transform: 'scale(1) translateY(100vh)'
    });
    setTimeout(function () {
      phrase.remove();
    }, 500);
  }, 1500);
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}