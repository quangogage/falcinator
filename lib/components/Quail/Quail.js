import $ from 'jquery';
import generate from './Generate';
import { ShakeCamera } from '../Camera/Camera';
import { shootBullet } from '../Bullet/Bullet';
import { CreateFlash } from '../Flash';
import { ship } from '../Game';
var frames = [
  require('./frames/box1.png'),
  require('./frames/box2.png'),
  require('./frames/box3.png')
];
var framerate = 90;
export var quails = [];

// Customizable Variables
var speedRange = [0.1, 0.3]; // How fast can a quail go?
var camShake = 5; // How much does the camera shake when you kill a quail?

// ** Global Functions ** \\
export function updateQuail(
  world,
  bullets,
  createBlood,
  createParticle,
  addScore,
  subtractScore,
  dt
) {
  generate(world, spawnQuail, dt); // Create them.
  for (var i = quails.length - 1; i >= 0; i--) {
    var v = quails[i];
    var el = v.el;

    // Move
    v.x += v.speed * v.dir * dt;

    //Animate
    animQuail(v, dt);

    // Apply changes
    el.css({
      left: v.x,
      top: v.y,
      transform: `scaleX(${v.dir})`
    });
    el.attr('src', frames[v.frame]);

    // Remove if off screen
    if (
      (v.dir === 1 && v.x > window.innerWidth + el.width()) ||
      (v.dir === -1 && v.x < -el.width())
    ) {
      subtractScore();
      killQuail(i);
    }

    // Collide with bullets
    for (var ia = bullets.length - 1; ia >= 0; ia--) {
      var va = bullets[ia];
      var quailX = v.x;
      var quailY = v.y;
      var quailWidth = el.width();
      var quailHeight = el.height();
      var bulletX = va.x;
      var bulletY = va.y;

      if (
        bulletX > quailX &&
        bulletX < quailX + quailWidth &&
        bulletY > quailY &&
        bulletY < quailY + quailHeight
      ) {
        var deathX = v.x + v.el.width() / 2;
        var deathY = v.y + v.el.height() / 2;
        createBlood(
          quailX + v.el.width() / 2,
          quailY + v.el.height() / 2,
          va.angle
        );
        createParticle(
          v.x + v.el.width() / 2,
          v.y + v.el.height() / 2,
          va.angle
        );
        addScore();
        va.setToDelete = true; // Actually gets deleted inside of Bullet.js
        killQuail(i);
        ShakeCamera(camShake);
        CreateFlash(
          va.x + Math.cos(va.angle) * 20,
          va.y + Math.sin(va.angle) * 20
        );
        if (va.onDestroy) {
          va.onDestroy(v.x + v.el.width() / 2, v.y + v.el.height() / 2);
        }
      }
    }
  }
}

// ** Helper Functions ** \\
function spawnQuail(world) {
  var el = $(
    `<img src=${frames[0]} class='quail' width='75' draggable='false' />`
  );
  var side = Math.floor(getRandom(0, 100));
  var x, y, dir;

  // Position
  if (side <= 50) {
    x = -50;
    dir = 1;
  } else {
    x = window.innerWidth + 50;
    dir = -1;
  }
  y = getRandom(window.innerHeight * 0.05, window.innerHeight * 0.95);
  // Create in array
  quails[quails.length] = {
    x: x,
    y: y,
    speed: getRandom(speedRange[0] * 100, speedRange[1] * 100) / 100,
    dir: dir,
    animTimer: 0,
    animDir: 1,
    frame: 0,
    el: el
  };

  // Place in world
  world.append(el);
}

// Animate the quail
function animQuail(v, dt) {
  v.animTimer = v.animTimer + dt;
  if (v.animTimer > framerate) {
    if (v.animDir === 1) {
      if (v.frame === frames.length - 1) {
        v.frame--;
        v.animDir = -1;
      } else {
        v.frame++;
      }
      v.animTimer = 0;
    } else {
      if (v.frame === 0) {
        v.frame++;
        v.animDir = 1;
      } else {
        v.frame--;
      }
      v.animTimer = 0;
    }
  }
}

// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}

// ☠️
function killQuail(i) {
  var v = quails[i];
  $.when(v.el.remove()).then(quails.splice(i, 1));
}
