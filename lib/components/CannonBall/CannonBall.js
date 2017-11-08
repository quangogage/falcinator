import $ from 'jquery';
import { powerupList } from '../Powerups/HandlePowerups';

var image = require('./cannonball.png');
var styles = {
  position: 'absolute'
};
export var cannonballs = [];

// Shoot a cannonball
export function ShootCannonBall(mouseX, mouseY) {
  if (powerupList[4].active === true) {
    var shipX = ship.offset().left + ship.width() / 2;
    var shipY = ship.offset().top + ship.height() / 2;
    var angle = Math.atan2(shipY - mouseY, shipX - mouseX) + Math.PI / 2;
    var el = $(`<img src=${image} class="cannonball" />`);

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
export function UpdateCannonBall(dt) {}
