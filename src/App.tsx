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
  [false, false, false, false, false, false, false, false], // track 10
];

const track = [
{ name: "track0", sound: "kick1.wav", color: "kick-pad", name: "Kick 1" },
const track1 = { sound: "kick2.wav", color: "ring", name: "Kick 2" };
const track2 = { sound: "kick2.wav", color: "chart-1", name: "Bass 1" };
const track3 = { sound: "kick2.wav", color: "chart-2", name: "Bass 2" };
const track4 = { sound: "kick2.wav", color: "chart-3", name: "Snare 1" };
const track5 = { sound: "kick2.wav", color: "chart-4", name: "Snare 2" };
const track6 = { sound: "kick2.wav", color: "chart-5", name: "Synth 1" };
const track7 = { sound: "kick2.wav", color: "chart-1", name: "Synth 2" };
const track8 = { sound: "kick2.wav", color: "secondary", name: "HiHat 1" };
const track9 = { sound: "kick2.wav", color: "secondary", name: "HiHat 2" };
]

function App() {
  const [bpm, setBpm] = useState(130);
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <Pad color={track0.color} isActive={true} onClick={() => console.log("clicked")} />
    </div>
  );
}

export default App;
