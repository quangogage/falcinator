import $ from 'jquery';

export var timer = 10000;
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

export function LoadTimer() {
  timer = 600;
  el = $('<div class="timer">' + toHHMMSS(timer) + '</div>');
  el.css(styles);
  $('.Game').append(el);
}
export function UpdateTimer(dt) {
  timer -= 1;
  if (timer <= 0) {
    timer = 0;
  }
  el.html(toHHMMSS(timer));
  intensity();
}
export function AddTime(amount) {
  timer += amount;
  var note = $('<div class="add">' + toSS(amount) + '</div>');
  note.css({
    fontFamily: 'alarm clock',
    fontSize: '100px',
    position: 'absolute',
    bottom: '5px',
    left: el.offset().left + el.width(),
    zIndex: 10,
    userSelect: 'none'
  });
  $('.Game').append(note);
}
setTimeout(function() {
  AddTime(100);
}, 500);

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
  return seconds;
}

// Get intense when time is running out!
function intensity() {
  if (timer <= 600) {
    var redness = 100 + Math.abs(timer - 600) / 255 * 100;
    var fontSize = 100 + Math.abs(timer - 600) / 650 * 100;
    el.css({
      color: `RGB(${redness},0,0)`,
      fontSize: `${fontSize}px`
    });
  }
}
