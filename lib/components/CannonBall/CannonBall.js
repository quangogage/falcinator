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
  if (powerupList[4].active === true) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
    var el = $(`<img src=${image} class="cannonball" />`);

    // Style
    el.css(styles);

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
  for (var i = 0; i < cannonballs.length; i++) {
    var v = cannonballs[i];

    // Move positions
    v.x += Math.cos(v.angle) * v.speed * dt;
    v.y += Math.sin(v.angle) * v.speed * dt;

    // Apply styles
    v.el.css({
      left: v.x,
      top: v.y
    });
  }
}
