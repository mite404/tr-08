# TR-08: Web-Based Drum Machine & Beat Sequencer

A modern, interactive drum machine and beat sequencer web application inspired
by the classic Roland TR-808. Create, program, and play complex drum patterns
across 10 instrument tracks with a responsive 16-step grid interface.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)
![Tone.js](https://img.shields.io/badge/Tone.js-15.1-22c55e)

## Features

### 🎛️ Core Sequencer

- **16-Step Beat Grid**: Intuitive step sequencer with 16th note resolution

- **10 Instrument Tracks**:
  - 2 Kick drums
  - 2 Bass synth samples
  - 2 Snare/clap samples
  - 2 Synth stabs
  - 2 Hi-hat samples

- **Real-Time Playback**: Play, pause, and stop functionality with Transport-precise
  timing via Tone.js

- **BPM Control**: Adjust tempo in real-time (40–300 BPM range)

## Recent Updates

- **Volume Knob Control** (Current Branch): Interactive knob for real-time volume adjustment with rotational angle-to-dB conversion
- **Commit #22**: Visual refinement—16th notes now display with slightly dimmed brightness for clarity
- **Commit #21**: Audio bundling improvement—samples imported as ES modules for production reliability
- **Commit #20**: Asset path fixes for relative image imports
- **Commit #19**: CI/CD setup with superlinter
- **Commit #18**: Beat naming feature—click title to customize sequence name

## File Structure

```
tr-08/
├── src/
│   ├── App.tsx                     # Main app, state & track config
│   ├── sequencer.ts                # Tone.js Transport engine
│   ├── App.css                     # App-specific styles
│   ├── index.css                   # Global styles (Tailwind imports)
│   ├── main.tsx                    # React entry point
│   ├── components/
│   │   ├── Pad.tsx                 # Individual grid button
│   │   ├── PlayStopBtn.tsx         # Play/stop toggle with split design
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── TempoDisplay.tsx        # BPM display with +/- controls
│   │   └── Knob.tsx                # Interactive volume control knob
│   └── assets/
│       ├── images/
│       │   └── MPC_mark.png        # TR-08 logo
│       └── samples/                # 10 drum audio samples (WAV)
├── dist/                           # Production build output
├── vite.config.ts                  # Vite configuration
├── tsconfig.app.json               # TypeScript app config
├── tsconfig.node.json              # TypeScript node config
├── eslint.config.js                # ESLint rules
├── tailwind.config.ts              # Tailwind customization
├── package.json                    # Dependencies & scripts
└── README.md                        # This file
```

## Architecture & Key Concepts

### State Management

The application uses **React hooks** with a functional component architecture. Key state in `App.tsx`:

1. **Grid State** (`grid`): 10×16 2D array of booleans (track × step)
2. **BPM State** (`bpm`): Tempo in beats per minute (40–300 range)
3. **Current Step** (`currentStep`): Active step position (0–15)
4. **Beat Name** (`beatName`): User-defined sequence name (max 25 chars)
5. **Knob Angle** (`knobAngle`): Volume knob rotation in degrees (10–256 range)
6. **Loading State** (`loadedCount`, `allPlayersReady`, `isLoading`): Audio sample status

### Volume Control System (Current Branch)

The volume knob uses a **rotational angle-to-dB conversion** system:

#### Component: **Knob.tsx** (`src/components/Knob.tsx`)

- **Props**:
  - `rotationAngle`: Current rotation in degrees (10–256)
  - `onDrag`: Callback fired when user drags knob
- **Interaction**: Vertical mouse movement adjusts angle; clamped to min/max bounds
- **Visual**: Amber button with black indicator line; offset by `-130` degrees for rendering
- **Behavior**: Drag position updates continuously via `handleWindowMouseMove` event listener

#### Functions in App.tsx

**`getKnobRotation(newAngle: number): number`** (App.tsx:~200)

- Converts dB values to rotation degrees
- Formula: `(newAngle + 20) * (350 / 25) + KNOB_STARTING_ANGLE`
- Used during initialization to set starting knob position based on initial volume (-5 dB)

**`getDbFromRotation(rotationAngle: number): number`** (App.tsx:~204)

- **Core conversion function**: Maps knob angle to dB value
- Input range: 10–256 degrees
- Output range: -25 dB to +5 dB (decibels)
- Linear interpolation formula: `((rotationAngle - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin`
- Currently logs dB value to console for debugging

**`handleKnobValueChange(newAngleFromKnob: number): void`** (App.tsx:~195)

- Handler triggered by `onDrag` callback from Knob component
- Updates `knobAngle` state for visual rendering
- Calls `getDbFromRotation()` to calculate audio volume
- **Note**: Currently calculates but doesn't apply dB value to audio players yet

#### Data Flow for Volume Control

1. User drags knob → Knob component fires `onDrag(newAngle)`
2. `handleKnobValueChange()` updates `knobAngle` state
3. Knob re-renders with new visual angle
4. `getDbFromRotation()` converts angle to dB (logged but not applied to audio)
5. Future: dB value should be applied to all track players' volume property

### Beat Name / Display Name Feature

Users customize the beat name via title interaction (Commit #18):

**Component Integration** (App.tsx)

- `[beatName, setBeatName]`: Stores current sequence name
- `[isEditTitleActive, setIsEditTitleActive]`: Toggles edit mode

**`handleTitleClick(): void`** (App.tsx:~173)

- Triggered when user clicks the h1 heading
- Sets `isEditTitleActive` to true to show input field

**`getDisplayTitle(): JSX.Element`** (App.tsx:~177)

- Conditional render: Returns either input field or heading
- Input mode: `<input>` with maxLength 25 chars, placeholder, keyboard handlers
- Display mode: `<h1>` with click handler and Stack Sans Notch font

**`handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void`** (App.tsx:~164)

- **Enter key**: Saves input value and exits edit mode
- **Escape key**: Cancels edit without saving
- Validates empty string (trims whitespace) before saving

### Component Architecture

All UI components are functional with TypeScript prop types:

- **Pad.tsx**: Individual grid button
  - Props: `color`, `isActive`, `isCurrentStep`, `is16thNote`, `onClick`
  - Styling: Opacity for active/inactive; brightness for playhead and 16th notes

- **PlayStopBtn.tsx**: Play/stop toggle with split visual design
  - Shows START/STOP as separate visual sections
  - Indicates current playback state
  - Disabled during loading

- **Button.tsx**: Reusable control button
  - Props: `text`, `customStyles`, `onClick`

- **TempoDisplay.tsx**: BPM display with +/– controls
  - Props: `bpmValue`, `onIncrementClick`, `onDecrementClick`
  - Real-time BPM adjustment during playback

- **Knob.tsx**: Interactive volume control
  - Props: `rotationAngle`, `onDrag`
  - Drag-based interaction with min/max clamping

### Sequencer Engine (`src/sequencer.ts`)

The `createSequencer()` function provides core timing:

- Uses **Tone.js Transport** for precise scheduling
- Schedules playback at 16th note intervals (`"16n"`)
- Methods: `start()`, `stop()`, `updateBpm()`, `dispose()`
- Callback: `onStep(step)` fires each 16th note with current step number (0–15)

### Audio Assets

Audio samples imported as ES modules (Commit #21):

- Vite bundles them into production build
- No runtime network requests
- 10 drum samples across 5 track pairs (kicks, bass, snares, synths, hi-hats)

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite`
- **Color system**: Track colors defined in `tracks` array
- **Grid layout**: CSS Grid with 16 columns (`grid-cols-16`)
- **Pad states**:
  - Playhead: `brightness-175` (very bright)
  - 16th notes: `brightness-135` (slightly dimmed)
  - Active: `opacity-100` | Inactive: `opacity-50`
- **Custom font**: Stack Sans Notch (Google Fonts)

### Data Flow Summary

1. **Grid interaction**: User clicks pad → `handlePadClick()` → `togglePad()` → state update → Pad re-renders
2. **Playback**: Sequencer fires `onStep` callback → updates `currentStep` → Pad brightness changes
3. **Volume**: User drags knob → `handleKnobValueChange()` → `getDbFromRotation()` → (future: apply to players)
4. **Title**: User clicks title → `handleTitleClick()` → shows input → `handleKeyDown()` handles save/cancel

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
