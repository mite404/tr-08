import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Pad } from "./components/Pad";
import { Button } from "./components/Button";
import { createSequencer as createSequencer, togglePad } from "./sequencer";

const initialGrid = [
  [false, false, false, false, false, false, false, false], // track 0
  [false, false, false, false, false, false, false, false], // track 1
  [false, false, false, false, false, false, false, false], // track 2
  [false, false, false, false, false, false, false, false], // track 3
  [false, false, false, false, false, false, false, false], // track 4
  [false, false, false, false, false, false, false, false], // track 5
  [false, false, false, false, false, false, false, false], // track 6
  [false, false, false, false, false, false, false, false], // track 7
  [false, false, false, false, false, false, false, false], // track 8
  [false, false, false, false, false, false, false, false], // track 9
];

const tracks = [
  { name: "Kick 1", sound: "kick1.wav", color: "bg-red-900" },
  { name: "Kick 2", sound: "kick2.wav", color: "bg-red-900" },
  { name: "Bass 1", sound: "bass1.wav", color: "bg-orange-800" },
  { name: "Bass 2", sound: "bass2.wav", color: "bg-orange-800" },
  { name: "Snare 1", sound: "snare1.wav", color: "bg-yellow-800" },
  { name: "Snare 2", sound: "snare2.wav", color: "bg-yellow-800" },
  { name: "Synth 1", sound: "synth1.wav", color: "bg-yellow-900" },
  { name: "Synth 2", sound: "synth2.wav", color: "bg-yellow-900" },
  { name: "HiHat 1", sound: "hh1.wav", color: "bg-orange-950" },
  { name: "HiHat 2", sound: "hh2.wav", color: "bg-orange-950" },
];

const colorMap: { [key: string]: string } = {
  // dark         light
  "bg-red-900": "bg-red-600",
  "bg-yellow-800": "bg-yellow-500",
  "bg-yellow-900": "bg-yellow-600",
  "bg-orange-950": "bg-orange-600",
  "bg-orange-800": "bg-orange-500",

  "bg-green-700": "bg-green-400",
  "bg-green-800": "bg-green-500",
  "bg-blue-600": "bg-blue-400",
  "bg-blue-700": "bg-blue-500",
  "bg-purple-900": "bg-purple-500",
};

function App() {
  const [bpm, setBpm] = useState(130);
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep, setCurrentStep] = useState(3);
  const createSequencerRef = useRef<ReturnType<typeof createSequencer>>(null);

  // scheduling loop??
  // const intervalId = setInterval(() => {
  //   console.log("tick");
  // }, 100);

  useEffect(() => {
    createSequencerRef.current = createSequencer(bpm, (step: number) => {
      setCurrentStep(step);
    });
  }, []);

  function handlePadClick(rowIndex: number, colIndex: number) {
    console.log(`Clicked: row ${rowIndex}, col ${colIndex}`);

    const newGrid = togglePad(grid, rowIndex, colIndex);
    setGrid(newGrid);
  }

  const getActiveColor = (baseColor: string, isActive: boolean): string => {
    if (!isActive) {
      return baseColor;
    } else {
      return colorMap[baseColor] ?? baseColor;
    }
  };

  function handlePlayClick() {
    if (createSequencerRef.current) {
      createSequencerRef.current.start();
    }
  }

  function handleStopClick() {
    if (createSequencerRef.current) {
      createSequencerRef.current.stop();
    }
  }

  return (
    // whole page container
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      {/* device container */}
      <div className="h-[500px] rounded-xl bg-gray-600 p-4 pt-20 pr-8 pl-8">
        {/* beat grid container */}
        <div className="rounded-md border-10 border-gray-900">
          {/* beat grid */}
          <div className="grid grid-cols-8 gap-2">
            {grid.map((track, rowIndex) => {
              return track.map((_, colIndex) => {
                return (
                  <Pad
                    color={getActiveColor(
                      tracks[rowIndex].color,
                      grid[rowIndex][colIndex],
                    )}
                    isActive={grid[rowIndex][colIndex]}
                    isCurrentStep={colIndex === currentStep}
                    onClick={() => handlePadClick(rowIndex, colIndex)}
                  />
                );
              });
            })}
          </div>
        </div>
        {/* control buttons container */}
        <div className="grid grid-cols-2 gap-2 pt-4">
          <Button text="PLAY" onClick={handlePlayClick} />
          <Button text="STOP" onClick={handleStopClick} />
        </div>
      </div>
    </div>
  );
}
export default App;
