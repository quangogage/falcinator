'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadTimer = LoadTimer;
exports.UpdateTimer = UpdateTimer;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = 100000;
var el;
var styles = {
  fontFamily: 'Barlow Condensed',
  fontSize: '3vw',
  position: 'absolute',
  bottom: '5px',
  left: '50%',
  transform: 'translateX(-50%)'
};

function LoadTimer() {
  timer = 0;
  el = (0, _jquery2.default)('<div class="timer">' + timer.toHHMMSS() + '</div>');
  el.css(styles);
  (0, _jquery2.default)('.Game').append(el);
}
function UpdateTimer(dt) {
  timer -= dt;
  el.html(timer.toHHMMSS());
}

// Format string to HHMMSS
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;
  var milli = sec_num - hours * 3600 - minutes;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds + ':' + milli;
};