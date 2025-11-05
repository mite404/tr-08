# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TR-08** is a drum machine / beat sequencer web application built with React, TypeScript, and Vite. It provides a visual 8-step sequencer grid where users can program drum patterns across 10 instrument tracks, control BPM (tempo), and play back the sequences.

## Build & Development Commands

```bash
npm run dev          # Start development server with Vite HMR
npm run build        # Compile TypeScript and build for production
npm run lint         # Run ESLint on all TS/TSX files
npm run preview      # Preview production build locally
```

## Architecture & Key Concepts

### State Management Flow

The application uses **React hooks** with a functional component architecture. Key state management happens in `App.tsx`:

1. **Grid State** (`grid`): A 10×8 2D array of booleans representing which tracks should play at which steps
2. **BPM State** (`bpm`): Current tempo in beats per minute
3. **Current Step** (`currentStep`): Which of the 8 steps is currently being played (0-7)

**Grid Structure:**
```
grid[trackIndex][stepIndex] = boolean
```
- 10 tracks (rows): Different drum sounds (kicks, bass, snare, synth, hi-hat)
- 8 steps (columns): One bar divided into 8 positions
- `true` = sound plays at this step, `false` = silent

### Sequencer Engine (`src/sequencer.ts`)

The `createSequencer()` function is the core timing engine:

- Uses `setInterval()` with an interval calculated from BPM: `60000 / bpm` milliseconds
- Manages playback state: `start()`, `stop()`, `updateBpm()`
- Calls the `onStep` callback function each beat, passing the current step number
- Returns an object with three methods for controlling playback

**Important Detail:** When `updateBpm()` is called while playing, it clears the old interval and creates a new one to maintain smooth playback.

### Component Architecture

All UI components are functional components with TypeScript prop types:

- **`Pad.tsx`**: Individual grid button (one pad = one track × one step)
  - Props: `color`, `isActive`, `isCurrentStep`, `onClick`
  - Styling: Opacity indicates active/inactive; brightness indicates current playhead position

- **`Button.tsx`**: Reusable control button for PLAY, STOP, SET TEMPO
  - Props: `text`, `customStyles`, `onClick`

- **`TempoDisplay.tsx`**: BPM display with increment/decrement arrows
  - Props: `bpmValue`, `onIncrementClick`, `onDecrementClick`

### Data Flow

1. User clicks a pad → `handlePadClick()` in App.tsx
2. `togglePad()` in sequencer.ts creates a new grid with toggled state
3. Grid state updates → re-renders all Pad components
4. Separately, sequencer callback fires on each step → updates `currentStep` state
5. Current step affects visual styling (brightness) of pads

### Styling

- **Tailwind CSS** for all styling (via `@tailwindcss/vite` plugin)
- **Color mapping system**: `colorMap` in App.tsx maps dark Tailwind colors to bright equivalents for active states
- **Device mockup**: Outer gray container simulates physical hardware aesthetic
- Grid uses CSS Grid (`grid-cols-8`) for layout

## TypeScript Configuration

Strict mode is enabled (`"strict": true`). Key compiler options:
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Linting rules enforce no unused locals/parameters
- No unchecked side effect imports

## Dependencies

- **`react` & `react-dom`**: UI framework
- **`tone.js`**: (installed but not yet integrated) For audio playback - audio context is being created but not yet hooked to sequencer output
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool with React plugin

## Known TODOs & Integration Points

1. **Audio Integration** (`App.tsx:95`): Currently logs active sample paths but doesn't send them to audio engine
   - The `mapActiveSamplesToPath()` function returns an array of sound file paths ready for playback
   - This needs to integrate with Tone.js to actually play the sounds
   - Audio samples are referenced by filename (e.g., "kick1.wav", "bass1.wav") but haven't been loaded/registered yet

2. **Sample Loading**: Audio samples need to be fetched and available to Tone.js or Web Audio API

## ESLint Configuration

Uses recommended configs for:
- ESLint base rules
- TypeScript ESLint (`typescript-eslint`)
- React Hooks (`eslint-plugin-react-hooks`)
- React Refresh (`eslint-plugin-react-refresh`)

No type-aware lint rules are enabled yet (would require project references in ESLint config).

## Development Notes

- Use `gridRef.current` pattern to pass fresh grid state to the sequencer callback (App.tsx:69-71)
- The `structuredClone()` function is used in `togglePad()` to create immutable updates
- Sequencer interval is re-calculated each time BPM changes while playing to maintain timing accuracy
- Color switching uses a map lookup pattern; consider adding new colors here when adding new track types
