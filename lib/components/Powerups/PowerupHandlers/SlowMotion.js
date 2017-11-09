import $ from 'jquery';
import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt) {}

// Overlay
var image = require('../intense.png');
var styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transition: '4s',
  opacity: 0,
  userSelect: 'none'
};
var zoomSet = false;

export function handleSlowMo(dt, now, lastUpdate) {
  var isActive = powerupList[1].active;
  if (isActive === true) {
    // Slow down delta time
    var newDt = (now - lastUpdate) / 2;

    // Overlay
    if ($('.intense').length === 0) {
      var el = $(`<img src=${image} class="intense" />`);
      el.css(styles);
      $('.Game').append(el);
    } else {
      $('.intense').css({ opacity: 1 });
    }

    // Zoom in
    if (zoomSet === false) {
      $('.Game').css({ transform: 'scale(1.25)' });
      zoomSet = true;
    }

    return newDt;
  } else {
    $('.intense').css({ opacity: 0 });
    if (zoomSet === true) {
      $('.Game').css({ transform: 'scale(1)' });
    }

    return now - lastUpdate;
  }
}
