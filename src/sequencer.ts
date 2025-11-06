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
  let timerId: number | null = null;
  let isPlaying = false;
  let currentStep = 0;
  let currentBpm = bpm;
  let intervalValue = 60000 / currentBpm;

  // create tone.js Transport
  const transport = Tone.getTransport();

  transport.scheduleRepeat((time) => {
    // callback fires every step

    currentStep = (currentStep + 1) % 8;

    // get active tracks at THIS step
    const activeTrackIds = getActiveSamplesAtStep(currentStep, gridRef.current);

    // start players w/ TIME from Transport
    for (const trackId of activeTrackIds) {
      if (tracks[trackId].player !== undefined) {
        tracks[trackId].player.start(time); // use Transport time
      }
    }

    // schedule UI update
    Tone.Draw.schedule(() => {
      onStep(currentStep);
    }, time);
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
