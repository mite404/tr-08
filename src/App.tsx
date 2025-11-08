import { useEffect, useRef, useState, type JSX } from "react";
import "./App.css";
import { Pad } from "./components/Pad";
import { TempoDisplay } from "./components/TempoDisplay";
import { createSequencer, togglePad } from "./sequencer";
import * as Tone from "tone";
import { PlayStopBtn } from "./components/PlayStopBtn";
import mpcMark from "./assets/images/MPC_mark.png";

export type TrackObject = {
  name: string;
  sound: string;
  color: string;
  player?: Tone.Player | undefined; // tone.js Player instance added on initialization of Players
};

const initialGrid = [
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 0
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 1
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 2
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 3
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 4
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 5
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 6
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 7
  [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ], // track 8
  [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ], // track 9
];

const tracks = [
  {
    name: "KICK 01",
    sound: "src/assets/samples/KICK01.wav",
    color: "bg-red-900",
  },
  {
    name: "KICK 20",
    sound: "src/assets/samples/KICK02.wav",
    color: "bg-red-900",
  },
  {
    name: "BASS 01",
    sound: "src/assets/samples/Bass_Tone_C_013.wav",
    color: "bg-orange-800",
  },
  {
    name: "BASS 02",
    sound: "src/assets/samples/BASS01.wav",
    color: "bg-orange-800",
  },
  {
    name: "SNARE 01",
    sound: "src/assets/samples/JA_SNARE_1.wav",
    color: "bg-yellow-800",
  },
  {
    name: "SNARE 02",
    sound: "src/assets/samples/JA_SNARE_2.wav",
    color: "bg-yellow-800",
  },
  {
    name: "SYNTH 01",
    sound: "src/assets/samples/Stabs_&_Chords_016_Dm.wav",
    color: "bg-yellow-900",
  },
  {
    name: "SYNTH 02",
    sound: "src/assets/samples/Stabs_&_Chords_028_C.wav",
    color: "bg-yellow-900",
  },
  {
    name: "HH 01",
    sound: "src/assets/samples/Bh_Hit_Hihat_0008.wav",
    color: "bg-orange-950",
  },
  {
    name: "HH 02",
    sound: "src/assets/samples/Bh_Hit_Hihat_0009.wav",
    color: "bg-orange-950",
  },
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
  const [bpm, setBpm] = useState(140);
  const [grid, setGrid] = useState(initialGrid);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [beatName, setBeatName] = useState("TR-08");
  const [isEditTitleActive, setIsEditTitleActive] = useState(false);
  const createSequencerRef = useRef<ReturnType<typeof createSequencer>>(null);
  const gridRef = useRef(grid);
  const playersInitializedRef = useRef(false);

  // giving callback in createSequencer fresh state of grid
  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  // init Players and Sequencer
  useEffect(() => {
    const sequencer = createSequencer(
      bpm,
      (step: number) => {
        setCurrentStep(step);
      },
      gridRef,
      tracks,
    );
    createSequencerRef.current = sequencer;

    return () => {
      sequencer.dispose();
      createSequencerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if all players have loaded their samples
  useEffect(() => {
    if (loadedCount === 10) {
      setAllPlayersReady(true);
      console.log("loadedCount:", loadedCount);
    }
  }, [loadedCount]);

  function initPlayers(
    tracks: Array<TrackObject>,
    setLoadedCount: React.Dispatch<React.SetStateAction<number>>,
  ) {
    for (const track of tracks) {
      const trackPath = track.sound;

      const player = new Tone.Player({
        url: trackPath,
        onload: () => {
          setLoadedCount((prev) => {
            console.log("loadedCount:", prev + 1);
            return prev + 1;
          });
        },
        onerror: (error) => {
          console.log(`Failed to load sample for ${track.name}:`, error);
          setLoadedCount((prev) => prev + 1); // cont loaded anyway to avoid blocking
        },
      }).toDestination();
      track.player = player;
    }
  }

  const getActiveColor = (baseColor: string, isActive: boolean): string => {
    if (!isActive) {
      return baseColor;
    } else {
      return colorMap[baseColor] ?? baseColor;
    }
  };

  function handlePadClick(rowIndex: number, colIndex: number) {
    console.log(`Clicked: row ${rowIndex}, col ${colIndex}`);

    const newGrid = togglePad(grid, rowIndex, colIndex);
    setGrid(newGrid);
  }

  function handleStartStopClick() {
    if (createSequencerRef.current === null) return;

    const isPlaying = Tone.getTransport().state === "started";

    if (isPlaying) {
      createSequencerRef.current.stop();
    } else {
      if (!playersInitializedRef.current) {
        setIsLoading(true);
        setAllPlayersReady(false);
        initPlayers(tracks, setLoadedCount);
        playersInitializedRef.current = true;
        return;
      }
      if (allPlayersReady) {
        createSequencerRef.current.start();
      } else {
        setIsLoading(true);
      }
    }
  }

  function handleIncrementBpm() {
    const newBpm = bpm + 1;
    setBpm(newBpm);

    if (createSequencerRef.current) {
      createSequencerRef.current.updateBpm(newBpm);
    }
  }

  function handleDecrementBpm() {
    const newBpm = bpm - 1;
    setBpm(newBpm);

    if (createSequencerRef.current) {
      createSequencerRef.current.updateBpm(newBpm);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const userInput = event.currentTarget.value;

      if (userInput.trim() === "") {
        return;
      }
      setBeatName(userInput);
      setIsEditTitleActive(false);
      console.log(event);
    } else if (event.key === "Escape") {
      setIsEditTitleActive(false);
    }
  }

  function handleTitleClick() {
    console.log("handle title click run");
    setIsEditTitleActive(true);
  }

  function getDisplayTitle(): JSX.Element {
    if (isEditTitleActive) {
      return (
        <input
          className="text-4xl"
          maxLength={25}
          onKeyDown={handleKeyDown}
          placeholder="Enter name..."
        ></input>
      );
    } else {
      return (
        <h1
          onClick={handleTitleClick}
          className="stack-sans-notch-display1 text-7xl font-extralight"
        >
          {beatName}
        </h1>
      );
    }
  }

  return (
    // whole page container
    <div className="flex min-h-screen items-center justify-center bg-gray-950">
      {/* device container */}
      <div className="rounded-xl bg-gray-600 p-4 pt-12 pr-8 pb-8 pl-8">
        {/* HEADER container */}
        <div className="flex items-center">
          <img className="w-[200px] p-6" src={mpcMark} alt="TR-08 Mark"></img>
          {getDisplayTitle()}
        </div>
        {/* beat grid container */}
        <div className="rounded-md border-10 border-gray-900">
          {/* beat grid */}
          <div className="grid grid-cols-16 gap-1 p-0.5">
            {grid.map((track, rowIndex) => {
              return track.map((_, colIndex) => {
                return (
                  <Pad
                    // eslint-disable-next-line react-x/no-array-index-key
                    key={`${rowIndex}-${colIndex}`}
                    color={getActiveColor(
                      tracks[rowIndex].color,
                      grid[rowIndex][colIndex],
                    )}
                    isActive={grid[rowIndex][colIndex]}
                    isCurrentStep={colIndex === currentStep}
                    is16thNote={colIndex % 2 === 0}
                    onClick={() => handlePadClick(rowIndex, colIndex)}
                  />
                );
              });
            })}
          </div>
        </div>
        {/* control buttons container */}
        <div className="grid grid-cols-2 gap-2 p-6 pt-6">
          <div className="">
            <PlayStopBtn
              customStyles=""
              onClick={handleStartStopClick}
              disabled={isLoading}
            />
          </div>
          {/* set tempo controls container */}
          <div className="grid grid-cols-1">
            <TempoDisplay
              bpmValue={bpm}
              onIncrementClick={handleIncrementBpm}
              onDecrementClick={handleDecrementBpm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
