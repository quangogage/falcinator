/*
  This is where the Quails get generated,
  this function is used inside of Quail>updateQuail.
*/

var timer = 0;

// Adjustable Variables
var spawnRateRange = [3300, 3300]; // How quickly should they spawn at first?
var maxSpawnRate = 300; // What is the cap for how quickly they can spawn
var spawnRateIncrease = 0.42; // How fast does the spawn rate increase ( every frame ) ?
var spawnAmountRange = [1, 2]; // How many can spawn at once?
var timerLim = getRandom(spawnRateRange[0], spawnRateRange[1]);
export default function generate(world, spawnQuail, dt) {
  timer += dt;
  if (timer >= timerLim) {
    var amount = Math.round(
      getRandom(spawnAmountRange[0] * 100, spawnAmountRange[1] * 100) / 100
    );
    for (var i = 0; i < amount; i++) {
      spawnQuail(world);
    }
    timer = 0;
  }
  if (timerLim > 900) {
    timerLim -= spawnRateIncrease;
  } else if (timerLim > 750) {
    timerLim -= spawnRateIncrease * 0.25;
  } else if (timerLim > 500) {
    timerLim -= spawnRateIncrease * 0.05;
  }
  console.log(timerLim);
}

// ** Helper Functions ** \\
// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
