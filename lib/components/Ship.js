import $ from 'jquery';
import logo from './ship.svg';
import { currentPowerup, powerupList } from './Powerups/Powerups';

// ** Global Functions ** \\
export function loadShip() {
  // Ship
  var ship = $(`<img src=${logo} class="ship" width="75"></div>`);
  repositionShip(ship);
  setTimeout(function() {
    repositionShip(ship);
  }, 50);
  return ship;
}
export function updateShip(ship, dt, mouseX, mouseY) {
  aimShip(ship, mouseX, mouseY);
}
export function repositionShip(ship, x, y) {
  var newX = window.innerWidth / 2 - ship.width() / 2;
  var newY = window.innerHeight / 2 - ship.height() / 2;

  // Custom positions ( if given. )
  if (x) {
    newX = x;
  }
  if (y) {
    newY = y;
  }
  ship.css({
    left: newX,
    top: newY,
    transformOrigin: '59% 61%'
  });
}

// ** Helper Functions ** \\
// Aim at the mouse
function aimShip(ship, mouseX, mouseY) {
  var shipX = ship.offset().left + ship.width() / 2;
  var shipY = ship.offset().top + ship.height() / 2;
  var angle = Math.atan2(mouseY - shipY, mouseX - shipX) + Math.PI * 0.8;
  ship.css({
    transform: 'rotate(' + angle + 'rad)'
  });
}
// Handle Powerups
function handlePowerups() {
  if (currentPowerup === null) {
    return false;
  } else {
    console.log('yup');
  }
}
