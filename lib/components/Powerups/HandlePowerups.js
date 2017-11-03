import { FastShooting } from './PowerupHandlers/FastShooting';
var powerupList = [
  {
    name: 'fast shooting',
    func: FastShooting
  }
];

export default function HandlePowerups() {
  console.log(powerupList[0].func);
}
