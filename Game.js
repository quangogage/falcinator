import React from 'react';
import './styles.css';
import { loadShip, updateShip, repositionShip } from './Ship';
import { updateBullets, shootBullet } from './Bullet';
import { updateQuail } from './Quail/Quail';
import { loadBlood, resizeBlood, createBlood } from './Blood/Blood';
import { createParticle, updateParticle } from './Particle/Particle';
import { addScore, subtractScore, loadScore } from './Score/Score';
import { updatePowerups } from './Powerups/Powerups';
import $ from 'jquery';

var lastUpdate = Date.now();
var ship;
var world;
var gameLoopInterval;
var mouseX = 0,
  mouseY = 0;
var bullets = [];

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
  loadScore();

  world.append(ship);
}

function updateGame() {
  var now = Date.now();
  var dt = now - lastUpdate;
  lastUpdate = now;
  bullets = updateBullets(dt);
  updateShip(ship, dt, mouseX, mouseY);
  updateParticle(dt);
  updateQuail(
    $('.Game'),
    bullets,
    createBlood,
    createParticle,
    addScore,
    subtractScore,
    dt
  );
  updatePowerups(bullets, dt);
}

function gameClick(e) {
  shootBullet(e.pageX, e.pageY, ship, world);
}
function gameResize() {
  repositionShip(ship);
  resizeBlood();
}

export default class Game extends React.Component {
  componentDidMount() {
    loadGame();
    gameLoopInterval = setInterval(updateGame, 1000 / 60);
  }
  render() {
    return <div className="Game" />;
  }
}
