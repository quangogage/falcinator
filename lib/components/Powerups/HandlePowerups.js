var powerupList = [
  {
    name: 'fast shooting',
    func: require('./PowerupHandlers/FastShooting')
  }
];

export default function HandlePowerups() {
  alert('handle powerups is being updated');
  powerupList[0].func();
}
