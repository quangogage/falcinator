var powerupList = [
  {
    name: 'fast shooting',
    func: require('./PowerupHandlers/FastShooting')
  }
];

export default function HandlePowerups() {
  powerupList[0].func();
}
