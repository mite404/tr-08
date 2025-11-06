import * as Tone from "tone";
import { type TrackObject } from "./App.tsx";
import type { RefObject } from "react";

type Grid = Array<Array<boolean>>;

export function togglePad(grid: Grid, row: number, col: number): Grid {
  const newGrid = structuredClone(grid);

  newGrid[row][col] = !newGrid[row][col];

  return newGrid;
}

export function getActiveSamplesAtStep(
  step: number,
  grid: Array<Array<boolean>>,
): Array<number> {
  const trackIdsThatAreActive: Array<number> = [];
  for (let trackIndex = 0; trackIndex < grid.length; trackIndex++) {
    const currentTrack: boolean[] = grid[trackIndex];
    const currentSettingOfTrackAtCurrentStep = currentTrack[step];
    if (currentSettingOfTrackAtCurrentStep === true) {
      trackIdsThatAreActive.push(trackIndex);
    }
  }
  return trackIdsThatAreActive;
}

export function createSequencer(
  bpm: number,
  onStep: (step: number) => void,
  gridRef: RefObject<Grid>,
  tracks: Array<TrackObject>,
) {
  let currentStep = 0;

  // create tone.js Transport
  const transport = Tone.getTransport();

  transport.scheduleRepeat((time) => {
    // callback fires every step
    if (gridRef.current === null) {
      return;
    }

    const stepToPlay = currentStep;

    // get active tracks at THIS step
    const activeTrackIds = getActiveSamplesAtStep(stepToPlay, gridRef.current);

    // start players w/ TIME from Transport
    for (const trackId of activeTrackIds) {
      if (tracks[trackId].player !== undefined) {
        tracks[trackId].player.start(time); // use Transport time
      }
    }

    // schedule UI update
    Tone.Draw.schedule(() => {
      onStep(stepToPlay);
    }, time);

    currentStep = (currentStep + 1) % 8; // incrememnt the step after Transport callback is fired
  }, "8n");

  return {
    start() {
      transport.start();
    },

    stop() {
      transport.stop();
      currentStep = 0;
      onStep(currentStep);
    },

    updateBpm(newBpm: number) {
      transport.bpm.value = newBpm;
    },
  };
}
