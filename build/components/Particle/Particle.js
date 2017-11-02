'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParticle = createParticle;
exports.updateParticle = updateParticle;

require('./styles.css');

var _Explosion = require('./Explosion');

var _Explosion2 = _interopRequireDefault(_Explosion);

var _Dusts = require('./Dusts');

var _Dusts2 = _interopRequireDefault(_Dusts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createParticle(x, y, angle) {
  _Explosion2.default.play(x, y);
  _Dusts2.default.play(x, y, angle);
}

function updateParticle(dt) {
  _Dusts2.default.update(dt);
}