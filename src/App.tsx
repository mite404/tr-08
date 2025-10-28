import { useState } from "react";
import "./App.css";

const initialGrid = [
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 0
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 1
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 2
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 3
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 4
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 5
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 6
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 7
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 8
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 9
  ["false", "false", "false", "false", "false", "false", "false", "false"], // track 10
];

const track0 = { sound: "kick1.wav", color: "red" };

function App() {
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <div style={{ backgroundColor: "var(--background-color)", height: "100vh" }}>
        <p>test</p>
      </div>
    </>
  );
}

export default App;
