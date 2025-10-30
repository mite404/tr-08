import { useState } from "react";
import "./App.css";
import { Pad } from "./components/pad";

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
  { name: "Kick 1", sound: "kick1.wav", color: "kick-pad" },
  { name: "Kick 2", sound: "kick2.wav", color: "ring" },
  { name: "Bass 1", sound: "kick2.wav", color: "chart-1" },
  { name: "Bass 2", sound: "kick2.wav", color: "chart-2" },
  { name: "Snare 1", sound: "kick2.wav", color: "chart-3" },
  { name: "Snare 2", sound: "kick2.wav", color: "chart-4" },
  { name: "Synth 1", sound: "kick2.wav", color: "chart-5" },
  { name: "Synth 2", sound: "kick2.wav", color: "chart-1" },
  { name: "HiHat 1", sound: "kick2.wav", color: "secondary" },
  { name: "HiHat 2", sound: "kick2.wav", color: "secondary" },
];

function App() {
  const [bpm, setBpm] = useState(130);
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep, setCurrentStep] = useState(0);

  function handleClick(rowIndex: number, colIndex: number) {
    console.log(`Clicked: row ${rowIndex}, col ${colIndex}`);
  }

  return (
    // outer container
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="border-10 border-gray-700">
        {/* beat grid */}
        <div className="grid grid-cols-8 gap-2">
          {initialGrid.map((track, rowIndex) => {
            return track.map((_, colIndex) => {
              return (
                <Pad
                  color="bg-red-700"
                  isActive={true}
                  onClick={() => handleClick(rowIndex, colIndex)}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
