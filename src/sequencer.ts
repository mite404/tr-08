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
  let currentBPM = bpm;
  const intervalValue = 60000 / currentBPM;

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
      if (timerId) {
        clearInterval(timerId);
        isPlaying = false;
        timerId = null;
        currentStep = 0;
        onStep(currentStep);
      }
    },

    setBPM(newBPM: number) {
      currentBPM = newBPM;
    },
  };
}

// function advancePlayhead(currentStep) {
//   //
// }

// function playSound(grid, row, currentStep) {
//   //
// }

// function changeBpm(bpm) {
//   //
// }
