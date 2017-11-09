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
  transition: '1s',
  opacity: 0
};

export function handleSlowMo(dt, now, lastUpdate) {
  var isActive = powerupList[1].active;
  if (isActive === true) {
    // Slow down delta time
    var newDt = (now - lastUpdate) / 2;

    if ($('.intense').length === 0) {
      var el = $(`<img src=${image} class="intense" />`);
      el.css(styles);
      $('.Game').append(el);
    } else {
      $('.intense').css({ opacity: 1 });
    }
    // Intensity effect
    return newDt;
  } else {
    $('.intense').css({ opacity: 0 });
    return now - lastUpdate;
  }
}
