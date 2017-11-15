'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timer = undefined;
exports.LoadTimer = LoadTimer;
exports.UpdateTimer = UpdateTimer;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = exports.timer = 10000;
var el;
var styles = {
  fontFamily: 'alarm clock',
  fontWeight: '200',
  fontSize: '50px',
  position: 'absolute',
  bottom: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10
};

function LoadTimer() {
  exports.timer = timer = 600;
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

// Get intense when time is running out!
function intensity() {
  if (timer <= 600) {
    var redness = 100 + Math.abs(timer - 600) / 255 * 100;
    var fontSize;
    el.css({
      color: 'RGB(' + redness + ',0,0)'
    });
  }
}