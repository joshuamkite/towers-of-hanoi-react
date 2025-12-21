import { useState, useMemo } from 'react';
import { useHanoiGame } from '../useHanoiGame';
import { Tower } from './Tower';
import '../styles/Game.css';

export const Game = () => {
    const [diskCount, setDiskCount] = useState(3);
    const [draggedFrom, setDraggedFrom] = useState<number | null>(null);
    const { gameState, selectTower, moveDisk, reset } = useHanoiGame(diskCount);

    // Detect if device supports touch
    const isMobile = useMemo(() =>
        'ontouchstart' in window || navigator.maxTouchPoints > 0
        , []);

    const handleDiskCountChange = (count: number) => {
        setDiskCount(count);
        // Reset will be triggered by the hook when diskCount changes
    };

    const handleDragStart = (towerId: number) => {
        setDraggedFrom(towerId);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (toTowerId: number) => {
        if (draggedFrom !== null && draggedFrom !== toTowerId) {
            moveDisk(draggedFrom, toTowerId);
        }
        setDraggedFrom(null);
    };

    const minMoves = Math.pow(2, diskCount) - 1;

    return (
        <div className="game">
            <header className="game-header">
                <h1>🗼 Towers of Hanoi 🗼</h1>
                <p className="game-description">
                    Move all disks from the first tower to the last tower. You can only move one disk at a time, and you cannot place a larger disk on top of a smaller disk.
                    <br></br>
                    {isMobile
                        ? 'Tap on a tower to select it, then tap on another tower to move the top disk.'
                        : 'Click on a tower to select it and then click on another tower to move the top disk. Alternatively, you can drag and drop disks between towers.'
                    }
                </p>
            </header>

            <div className="game-controls">
                <div className="control-group">
                    <label htmlFor="disk-count">Number of Disks:</label>
                    <select
                        id="disk-count"
                        value={diskCount}
                        onChange={(e) => handleDiskCountChange(Number(e.target.value))}
                    >
                        {[3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                                {num} disks
                            </option>
                        ))}
                    </select>
                </div>
                <button className="reset-button" onClick={reset}>
                    Reset Game
                </button>
            </div>

            <div className="game-stats">
                <div className="stat">
                    <span className="stat-label">Moves:</span>
                    <span className="stat-value">{gameState.moves}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Minimum Moves:</span>
                    <span className="stat-value">{minMoves}</span>
                </div>
            </div>

            <div className="towers-container">
                {gameState.towers.map((tower) => (
                    <Tower
                        key={tower.id}
                        tower={tower}
                        isSelected={gameState.selectedTower === tower.id}
                        onSelect={() => selectTower(tower.id)}
                        totalDisks={diskCount}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        enableDrag={!isMobile}
                    />
                ))}
            </div>

            {gameState.isComplete && (
                <div className="victory-message">
                    <h2>🎉 Congratulations!</h2>
                    <p>
                        You completed the puzzle in {gameState.moves} moves!
                        {gameState.moves === minMoves && (
                            <span className="perfect"> Perfect score! 🌟</span>
                        )}
                    </p>
                    <button className="play-again-button" onClick={reset}>
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};
