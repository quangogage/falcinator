import $ from 'jquery';
import { bullets } from '../Bullet';
const img = require('../envelope.jpg');

var styles = {
  position: 'absolute'
};
var Envelop = {
  name: 'envelop',

  // Creating an envelop bullet
  create: function(originX, originY, targetX, targetY) {
    var el, angle;

    // Create element/Basic styles
    el = $(`<img src=${img} class="bullet"/>`);
    el.css(styles);

    // Calculate Direction / Point in that direction
    angle = Math.atan2(targetY - originY, targetX - targetX);
    el.css({ transform: 'rotate(' + angle + 'rad)' });

    // Init the object
    bullets[bullets.length] = {
      type: 'envelop',
      el: el,
      x: originX,
      y: originY,
      angle: angle
    };
  },
  update: function(dt) {}
};

export default Envelop;
