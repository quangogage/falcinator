'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadShip = loadShip;
exports.updateShip = updateShip;
exports.repositionShip = repositionShip;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ship = require('./ship.svg');

var _ship2 = _interopRequireDefault(_ship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ** Global Functions ** \\
function loadShip() {
  // Ship
  var ship = (0, _jquery2.default)('<img src=' + _ship2.default + ' class="ship" width="75"></div>');
  repositionShip(ship);
  setTimeout(function () {
    repositionShip(ship);
  }, 50);
  return ship;
}
function updateShip(ship, dt, mouseX, mouseY) {
  aimShip(ship, mouseX, mouseY);
}
function repositionShip(ship, x, y) {
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