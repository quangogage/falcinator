import $ from 'jquery';

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

export function LoadTimer() {
  timer = 0;
  el = $('<div class="timer">' + toHHMMSS(timer) + '</div>');
  el.css(styles);
  $('.Game').append(el);
}
export function UpdateTimer(dt) {
  timer -= 50 / dt;
  el.html(toHHMMSS(timer));
}

// Format string to HHMMSS
function toHHMMSS(time) {
  var sec_num = parseInt(time, 10); // don't forget the second param
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
}
