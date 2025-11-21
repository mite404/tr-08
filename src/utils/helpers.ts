// conversion constants
// const KNOB_STARTING_ANGLE = 320; // -5dB starting position
const MIN_ROTATION_ANGLE = 10;
const MAX_ROTATION_ANGLE = 256;
const MIN_DB = -25;
const MAX_DB = 5;

// convert input dB level to rotation angle
export function getAngleFromDb(dbValue: number): number {
  return (
    ((dbValue - MIN_DB) / (MAX_DB - MIN_DB)) *
      (MAX_ROTATION_ANGLE - MIN_ROTATION_ANGLE) +
    MIN_ROTATION_ANGLE
  );
}

// convert input angle to dB level
export function getDbFromAngle(angleValue: number): number {
  return (
    ((angleValue - MIN_ROTATION_ANGLE) /
      (MAX_ROTATION_ANGLE - MIN_ROTATION_ANGLE)) *
      (MAX_DB - MIN_DB) +
    MIN_DB
  );
}

export function clampAngle(angleValue: number): number {
  // possible oneliner solution: newAngle = Math.max(10, Math.min(270, newAngle))
  if (angleValue > MAX_ROTATION_ANGLE) {
    angleValue = MAX_ROTATION_ANGLE;
  } else if (angleValue < MIN_ROTATION_ANGLE) {
    angleValue = MIN_ROTATION_ANGLE;
  }

  return angleValue;
}
