import $ from 'jquery';
import { powerupList } from '../Powerups/HandlePowerups';

var image = require('./cannonball.png');
var styles = {
  position: 'absolute'
};
export var cannonballs = [];
var speed = 0.666;

// Shoot a cannonball
export function ShootCannonBall(mouseX, mouseY, ship) {
  if (powerupList[5].active === true) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI;
    var el = $(`<img src=${image} class="cannonball" />`);

    // Style
    el.css(styles);
    el.css({ left: shipX, top: shipY });

    // Add to array
    cannonballs[cannonballs.length] = {
      el: el,
      x: shipX,
      y: shipY,
      angle: angle,
      rotation: 0
    };

    $('.Game').append(el);
  }
}

// Update loop
export function UpdateCannonBall(dt) {
  var i = cannonballs.length;
  while (i--) {
    var v = cannonballs[i];

    // Move positions
    v.x += Math.cos(v.angle) * speed * dt;
    v.y += Math.sin(v.angle) * speed * dt;

    // Apply styles
    v.el.css({
      left: v.x,
      top: v.y
    });

    // Going offscreen
    if (
      v.x < 0 ||
      v.y < 0 ||
      v.x > window.innerWidth ||
      v.y > window.innerHeight
    ) {
      v.setToRemove = true;
    }

    // Remove it
    if (v.setToDelete == true) {
      v.el.remove();
      cannonballs.splice(i, 1);
    }
  }
}
