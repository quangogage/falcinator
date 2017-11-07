/*
  This is where the Quails get generated,
  this function is used inside of Quail>updateQuail.
*/

var timer = 0;

// Adjustable Variables
var spawnRateRange = [3300, 3300]; // How quickly should they spawn at first?
var maxSpawnRate = 500; // What is the cap for how quickly they can spawn
var spawnRateIncrease = 1.25; // How fast does the spawn rate increase ( every frame ) ?
var spawnAmountRange = [1, 2]; // How many can spawn at once?
var stages = [
  {
    rate: 1050,
    multiplier: 0.75
  },
  {
    rate: 885,
    multiplier: 0.5
  }
];

var timerLim = getRandom(spawnRateRange[0], spawnRateRange[1]);
export default function generate(world, spawnQuail, dt) {
  if (timerLim <= stages[0].rate) {
    for (var i = 0; i < stages.length; i++) {
      var rate = stages[i].rate;
      var multiplier = stages[i].multiplier;
      if (stages[i + 1] !== null) {
        var nextRate = stages[i + 1].rate;
        if (timerLim <= rate && timerLim > nextRate) {
          timer += dt * multiplier;
        }
      } else {
        timer += dt * multipler;
      }
    }
  } else {
    timer += dt;
  }
  if (timer >= timerLim) {
    var amount = Math.round(
      getRandom(spawnAmountRange[0] * 100, spawnAmountRange[1] * 100) / 100
    );
    for (var i = 0; i < amount; i++) {
      spawnQuail(world);
    }
    timer = 0;
  }
  if (timerLim > maxSpawnRate) {
    timerLim -= spawnRateIncrease;
  }
  console.log(timerLim);
}

// ** Helper Functions ** \\
// Get a random number between two values
function getRandom(min, max) {
  return Math.random() * (max - min + 1) + min;
}
