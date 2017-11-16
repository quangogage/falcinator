'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseY = exports.mouseX = exports.ship = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./styles.css');

var _Ship = require('./Ship');

var _Bullet = require('./Bullet/Bullet');

var _Quail = require('./Quail/Quail');

var _Blood = require('./Blood/Blood');

var _Particle = require('./Particle/Particle');

var _Score = require('./Score/Score');

var _Powerups = require('./Powerups/Powerups');

var _User = require('./Firebase/User');

var _SlowMotion = require('./Powerups/PowerupHandlers/SlowMotion');

var _Camera = require('./Camera/Camera');

var _Beam = require('./Beam');

var _Jet = require('./Jet/Jet');

var _Timer = require('./Timer/Timer');

var _Lose = require('./Lose');

var _WeaponHandler = require('./WeaponHandler');

var _WeaponHandler2 = _interopRequireDefault(_WeaponHandler);

var _crosshair = require('./crosshair.png');

var _crosshair2 = _interopRequireDefault(_crosshair);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lastUpdate = Date.now();
var ship = exports.ship = undefined;
var world;
var gameLoopInterval;
var mouseX = exports.mouseX = 0;
var mouseY = exports.mouseY = 0;
var shipX, shipY;

var username = '';

function loadGame() {
  (0, _jquery2.default)(window).click(gameClick);
  (0, _jquery2.default)(window).mousemove(function (e) {
    exports.mouseX = mouseX = e.pageX;
    exports.mouseY = mouseY = e.pageY;
  });
  (0, _jquery2.default)(window).resize(gameResize);

  world = (0, _jquery2.default)('.Game');
  exports.ship = ship = (0, _Ship.loadShip)();
  (0, _Blood.loadBlood)();
  // loadScore();

  world.append(ship);
  // username = loadUser();
  (0, _Timer.LoadTimer)();
  (0, _Lose.LoadLose)();
}

function updateGame() {
  var now = Date.now();
  var dt = now - lastUpdate;
  dt = (0, _SlowMotion.handleSlowMo)(dt, now, lastUpdate);
  lastUpdate = now;
  (0, _Bullet.updateBullets)(dt);
  (0, _Beam.updateBeam)(dt);
  (0, _Ship.updateShip)(ship, dt, mouseX, mouseY);
  (0, _Jet.UpdateJet)(dt);
  (0, _Particle.updateParticle)(dt);
  (0, _Quail.updateQuail)((0, _jquery2.default)('.Game'), _Bullet.bullets, _Blood.createBlood, _Particle.createParticle, _Score.addScore, _Score.subtractScore, dt);
  (0, _Powerups.updatePowerups)(dt);
  (0, _Camera.UpdateCamera)(dt);
  (0, _Timer.UpdateTimer)(dt);
  (0, _Lose.UpdateLose)(dt);
}

function gameClick(e) {
  (0, _WeaponHandler2.default)(e.pageX, e.pageY);
}
function gameResize() {
  (0, _Ship.repositionShip)(ship, shipX, shipY);
  (0, _Blood.resizeBlood)();
}

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
  }

  _createClass(Game, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Game load/loop
      loadGame();
      gameLoopInterval = setInterval(updateGame, 1000 / 60);

      // Crosshair
      (0, _jquery2.default)('.Game').css({
        cursor: 'url(' + _crosshair2.default + '), pointer'
      });

      // Storing custom ship position
      if (this.props.x) {
        shipX = this.props.x;
      }
      if (this.props.y) {
        shipY = this.props.y;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'Game' });
    }
  }]);

  return Game;
}(_react2.default.Component);

exports.default = Game;