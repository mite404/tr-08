type Grid = boolean[][];

const bpm = 0;

export function togglePad(grid: Grid, row: number, col: number): Grid {
  const newGrid = structuredClone(grid);

  newGrid[row][col] = !newGrid[row][col];

  return newGrid;
}

function advancePlayhead(currentStep) {
  //
}

function playSound(grid, row, currentStep) {
  //
}

function changeBpm(bpm) {
  //
}
