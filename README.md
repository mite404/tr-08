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
│   │   └── TempoDisplay.tsx        # BPM display with +/- controls
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
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
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
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
