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

- **Interactive Gameplay** - Click towers to select and move disks
- **Beautiful UI** - Gradient backgrounds, colorful disks, and smooth animations
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

1. **Select a tower** - Click on a tower that has disks to select it (it will highlight in blue)
2. **Choose destination** - Click on another tower to move the top disk
3. **Follow the rules** - You can only place a smaller disk on top of a larger one
4. **Win the game** - Move all disks to Tower 3 to complete the puzzle
5. **Challenge yourself** - Try to solve it in the minimum number of moves!

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
- Move validation
- Tower selection
- Win condition detection
- Game reset functionality

### Components

- **Game** - Main container with controls, stats, and victory message
- **Tower** - Individual tower with pole, base, and disk stack
- **Disk** - Colorful disk with size-based width and hover effects

## Styling

The game features:
- Purple gradient background
- Color-coded disks (8 unique colors)
- Smooth hover animations
- Selected tower highlighting
- Responsive design
- Victory modal overlay

## Technologies Used

- **React 19.2.3** - UI framework
- **TypeScript 5.9.3** - Type safety
- **Bun** - Fast JavaScript runtime and package manager
- **Vite 7.3.0** - Lightning-fast build tool
- **CSS3** - Styling and animations
