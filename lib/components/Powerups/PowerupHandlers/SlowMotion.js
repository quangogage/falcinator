var isActive = false;
export function SlowMotion(dt, currentPowerup) {
  if (currentPowerup === 1) {
    isActive = true;
  } else {
    isActive = false;
  }
}

export function handleSlowMo(dt) {
  if (isActive === true) {
    return dt / 2;
  } else {
    return dt;
  }
}
