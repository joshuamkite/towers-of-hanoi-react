# Towers of Hanoi - React + TypeScript + Bun

Implementation of the classic Towers of Hanoi puzzle game built with React, TypeScript, and Bun.

![Towers of Hanoi Game](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.1.26-000000?style=flat&logo=bun)
![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF?style=flat&logo=vite)

## About the Game

The Towers of Hanoi is a classic mathematical puzzle where the objective is to move all disks from the first tower to the last tower, following these rules:

1. Only one disk can be moved at a time
2. A disk can only be placed on top of a larger disk
3. All disks must end up on the third tower

## Features

- **Dual Input Methods** - Click to select/move OR drag and drop disks
- **Drag and Drop** - Grab and drag disks between towers with visual feedback
- **Dark/Light Mode** - Automatically adapts to your system preferences
- **Beautiful UI** - Clean design, colorful disks, and smooth animations
- **Move Tracking** - See your current moves and compare with the optimal solution
- **Adjustable Difficulty** - Choose from 3 to 8 disks
- **Victory Celebration** - Special message when you complete the puzzle
- **Fast Refresh** - Instant updates during development with Vite HMR
- **Reset Functionality** - Start over anytime
- **Move Validation** - Prevents invalid moves automatically

## Project Structure

```
towers-of-hanoi-react/
├── src/
│   ├── components/
│   │   ├── Game.tsx          # Main game component
│   │   ├── Tower.tsx          # Individual tower display
│   │   └── Disk.tsx           # Disk component
│   ├── styles/
│   │   ├── Game.css           # Game styling
│   │   ├── Tower.css          # Tower styling
│   │   └── Disk.css           # Disk styling
│   ├── types.ts               # TypeScript type definitions
│   ├── useHanoiGame.ts        # Custom hook for game logic
│   ├── App.tsx                # Root component
│   ├── App.css                # App styling
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## How to Play

The game supports two input methods - choose whichever you prefer:

### Method 1: Click to Move
1. **Select a tower** - Click on a tower that has disks to select it (it will highlight in blue)
2. **Choose destination** - Click on another tower to move the top disk
3. **Deselect** - Click the same tower again to deselect

### Method 2: Drag and Drop
1. **Grab a disk** - Click and hold on the top disk of any tower (cursor shows "grab" icon)
2. **Drag to tower** - Drag the disk over the destination tower (it will highlight in green)
3. **Drop** - Release to place the disk on the new tower

### Game Rules
- You can only move the top disk from each tower
- You can only place a smaller disk on top of a larger disk
- Move all disks to Tower 3 to win
- Try to solve it in the minimum number of moves!

### Minimum Moves Formula

The minimum number of moves to solve the puzzle is: **2^n - 1** (where n is the number of disks)

- 3 disks: 7 moves
- 4 disks: 15 moves
- 5 disks: 31 moves
- 6 disks: 63 moves
- 7 disks: 127 moves
- 8 disks: 255 moves

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## Key Components

### Game Logic (`useHanoiGame.ts`)

Custom React hook that manages:
- Game state (towers, disks, moves)
- Move validation (both click and drag-and-drop)
- Tower selection
- Direct disk movement between towers
- Win condition detection
- Game reset functionality

### Components

- **Game** - Main container with controls, stats, victory message, and drag event coordination
- **Tower** - Individual tower with pole, base, disk stack, and drop zone functionality
- **Disk** - Draggable disk component with size-based width, visual feedback, and HTML5 drag API

## Styling

The game features:
- Automatic dark/light mode based on system preferences
- Clean, minimal background design
- Color-coded disks (8 unique colors)
- Smooth hover and drag animations
- Context-aware colors that adapt to theme
- Selected tower highlighting (blue border)
- Drag-over tower highlighting (green dashed border)
- Grab/grabbing cursor states for draggable disks
- Responsive design
- Victory modal overlay

## Technologies Used

- **React 19.2.3** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Bun** - Fast JavaScript runtime and package manager
- **Vite 7.3.0** - build tool
- **CSS3** - Styling and animations
