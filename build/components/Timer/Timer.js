'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timer = undefined;
exports.LoadTimer = LoadTimer;
exports.UpdateTimer = UpdateTimer;
exports.AddTime = AddTime;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = exports.timer = 10000;
var el;
var styles = {
  fontFamily: 'alarm clock',
  fontWeight: '200',
  fontSize: '100px',
  position: 'absolute',
  bottom: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  userSelect: 'none'
};

function LoadTimer() {
  exports.timer = timer = 2000;
  el = (0, _jquery2.default)('<div class="timer">' + toHHMMSS(timer) + '</div>');
  el.css(styles);
  (0, _jquery2.default)('.Game').append(el);
}
function UpdateTimer(dt) {
  exports.timer = timer -= 1;
  if (timer <= 0) {
    exports.timer = timer = 0;
  }
  el.html(toHHMMSS(timer));
  intensity();

  // Match addtime font size
  if ((0, _jquery2.default)('.add-timer').length !== 0) {
    (0, _jquery2.default)('.add-timer').css({
      fontSize: el.css('font-size'),
      left: el.offset().left + el.width()
    });
  }
}
function AddTime(amount) {
  exports.timer = timer += amount;
  var fadeTimeout;
  var note;
  if ((0, _jquery2.default)('.add-timer').length === 0) {
    note = (0, _jquery2.default)('<div class="add-timer"> +' + toSS(amount) + '</div>');
    note.css({
      fontFamily: 'alarm clock',
      fontSize: '100px',
      position: 'absolute',
      bottom: '5px',
      left: el.offset().left + el.width(),
      zIndex: 10,
      color: '#57FF59',
      userSelect: 'none',
      transition: 'opacity 0.5s, transform 0.5s'
    });
    (0, _jquery2.default)('.Game').append(note);
  } else {
    note = (0, _jquery2.default)('.add-timer');
    clearTimeout(fadeTimeout);
    note.css({ transition: '0s' });
    note.css({
      opacity: 1,
      transform: 'translateY(0px)',
      color: '#57FF59',
      transition: 'opacity 0.5s, transform 0.5s'
    });
    (0, _jquery2.default)('.add-timer').html('+' + toSS(amount));
  }
  // Subtracting score
  if (amount < 0) {
    note.css({ color: 'red' });
    note.html(toSS(amount));
  }
  fadeTimeout = setTimeout(function () {
    note.css({
      opacity: 0,
      transform: 'translateY(50px)'
    });
  }, 1500);
}

// Format string to HHMMSS
function toHHMMSS(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
function toSS(time) {
  return time / 100;
}

// Get intense when time is running out!
function intensity() {
  if (timer <= 600) {
    var redness = 100 + Math.abs(timer - 600) / 255 * 100;
    var fontSize = 100 + Math.abs(timer - 600) / 650 * 100;
    el.css({
      color: 'RGB(' + redness + ',0,0)',
      fontSize: fontSize + 'px'
    });
  } else if (el.css('color') !== 'rgb(0, 0, 0)') {
    el.css({ color: 'rgb(0, 0, 0)' });
  }
}