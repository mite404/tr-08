type Grid = boolean[][];

export function togglePad(grid: Grid, row: number, col: number): Grid {
  const newGrid = structuredClone(grid);

  newGrid[row][col] = !newGrid[row][col];

  return newGrid;
}

export function createSequencer(bpm: number, onStep: (step: number) => void) {
  let timerId: number | null = null;
  let isPlaying = false;
  let currentStep = 0;
  let currentBpm = bpm;
  let intervalValue = 60000 / currentBpm;

  return {
    start() {
      if (isPlaying) return;

      timerId = setInterval(() => {
        currentStep = (currentStep + 1) % 8; // advance step
        onStep(currentStep); // pass to callback
      }, intervalValue);

      isPlaying = true;
    },

    stop() {
      if (timerId && timerId !== null) {
        clearInterval(timerId);

        isPlaying = false;
        timerId = null;
        currentStep = 0;

        onStep(currentStep);
      }
    },

    updateBpm(newBpm: number) {
      if (isPlaying && timerId !== null) {
        clearInterval(timerId);

        currentBpm = newBpm;
        intervalValue = 60000 / newBpm;

        timerId = setInterval(() => {
          currentStep = (currentStep + 1) % 8;
          onStep(currentStep);
        }, intervalValue); // interval for the clock needs to be calc based on newBpm
      }
    },
  };
}
