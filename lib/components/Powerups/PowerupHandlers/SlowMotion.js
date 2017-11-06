import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt) {}

export function handleSlowMo(dt) {
  var isActive = powerupList[1].active;
  console.log(dt);
  if (isActive === true) {
    return dt / 2;
  } else {
    return dt;
  }
}
