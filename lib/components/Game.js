import React from 'react';
import './styles.css';
import { loadShip, updateShip, repositionShip } from './Ship';
import { updateBullets, shootBullet } from './Bullet';
import { updateQuail } from './Quail/Quail';
import { loadBlood, resizeBlood, createBlood } from './Blood/Blood';
import { createParticle, updateParticle } from './Particle/Particle';
import { addScore, subtractScore, loadScore } from './Score/Score';
import { updatePowerups } from './Powerups/Powerups';
import { loadUser } from './Firebase/User';
import crosshair from './crosshair.png';
import $ from 'jquery';

var lastUpdate = Date.now();
var ship;
var world;
var gameLoopInterval;
var mouseX = 0,
  mouseY = 0;
var bullets = [];
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
  loadScore();

  world.append(ship);
  username = loadUser();
  alert('if you see this something is wrong with the compiler');
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
  // updatePowerups(bullets, dt);
}

function gameClick(e) {
  shootBullet(e.pageX, e.pageY, ship, world);
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
