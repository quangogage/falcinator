'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateJet = CreateJet;
exports.UpdateJet = UpdateJet;

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jets = [];

// Default styles
var styles = {
  position: 'absolute',
  imageRendering: 'pixelated',
  transform: 'translateX(-50%) translateY(-50%)',
  userSelect: 'none',
  pointerEvents: 'none'
};

// Images
var image = {
  straight: require('./images/straight.png'),
  up: require('./images/up.png'),
  down: require('./images/down.png')
};

// Adjustable variables
var speed = 0.5; // How fast does the jet go?
var turnSpeed = 0.25; // How quickly can the jet aim at it's target?

function CreateJet() {}

function UpdateJet(dt) {
  var i = jets.length;
  while (i--) {
    var v = jets[i];
  }
}