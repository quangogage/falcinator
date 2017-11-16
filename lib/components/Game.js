import React from 'react';
import './styles.css';
import { loadShip, updateShip, repositionShip } from './Ship';
import { bullets, updateBullets } from './Bullet/Bullet';
import { updateQuail } from './Quail/Quail';
import { loadBlood, resizeBlood, createBlood } from './Blood/Blood';
import { createParticle, updateParticle } from './Particle/Particle';
import { addScore, subtractScore, loadScore } from './Score/Score';
import { updatePowerups } from './Powerups/Powerups';
import { loadUser } from './Firebase/User';
import { handleSlowMo } from './Powerups/PowerupHandlers/SlowMotion';
import { UpdateCamera } from './Camera/Camera';
import { updateBeam } from './Beam';
import { UpdateJet } from './Jet/Jet';
import { LoadTimer, UpdateTimer } from './Timer/Timer';
import { LoadLose, UpdateLose } from './Lose';
import WeaponHandler from './WeaponHandler';
import crosshair from './crosshair.png';
import $ from 'jquery';

var lastUpdate = Date.now();
export var ship;
var world;
var gameLoopInterval;
export var mouseX = 0;
export var mouseY = 0;
var shipX, shipY;

var username = '';

function loadGame() {
  $(window).click(gameClick);
  $(window).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });
  $(window).resize(gameResize);

  world = $('.Game');
  ship = loadShip();
  loadBlood();
  // loadScore();

  world.append(ship);
  // username = loadUser();
  LoadTimer();
  LoadLose();
}

function updateGame() {
  var now = Date.now();
  var dt = now - lastUpdate;
  dt = handleSlowMo(dt, now, lastUpdate);
  lastUpdate = now;
  updateBullets(dt);
  updateBeam(dt);
  updateShip(ship, dt, mouseX, mouseY);
  UpdateJet(dt);
  updateParticle(dt);
  updateQuail(
    $('.Game'),
    bullets,
    createBlood,
    createParticle,
    subtractScore,
    dt
  );
  updatePowerups(dt);
  UpdateCamera(dt);
  UpdateTimer(dt);
  UpdateLose(dt);
}

function gameClick(e) {
  WeaponHandler(e.pageX, e.pageY);
}
function gameResize() {
  repositionShip(ship, shipX, shipY);
  resizeBlood();
}

export default class Game extends React.Component {
  componentDidMount() {
    // Game load/loop
    loadGame();
    gameLoopInterval = setInterval(updateGame, 1000 / 60);

    // Crosshair
    $('.Game').css({
      cursor: `url(${crosshair}), pointer`
    });

    // Storing custom ship position
    if (this.props.x) {
      shipX = this.props.x;
    }
    if (this.props.y) {
      shipY = this.props.y;
    }
  }
  render() {
    return <div className="Game" />;
  }
}
