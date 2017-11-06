import { powerupList } from '../HandlePowerups';
export function SlowMotion(dt, isActiveArg) {}

export function handleSlowMo(dt) {
  var isActive = powerupList[1].active;
  console.log(powerupList[1].timer);
  if (isActive === true) {
    return dt / 2;
  } else {
    return dt;
  }
}
