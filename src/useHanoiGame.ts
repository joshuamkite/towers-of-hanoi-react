import { useState, useCallback } from 'react';
import type { GameState, Disk } from './types';

const createInitialState = (diskCount: number): GameState => {
    const disks: Disk[] = Array.from({ length: diskCount }, (_, i) => ({
        id: i,
        size: diskCount - i,
    }));

    return {
        towers: [
            { id: 0, disks },
            { id: 1, disks: [] },
            { id: 2, disks: [] },
        ],
        moves: 0,
        isComplete: false,
        selectedTower: null,
    };
};

export const useHanoiGame = (diskCount: number = 3) => {
    const [gameState, setGameState] = useState<GameState>(() => createInitialState(diskCount));

    const selectTower = useCallback((towerId: number) => {
        setGameState((prev) => {
            // If no tower is selected, select this tower if it has disks
            if (prev.selectedTower === null) {
                if (prev.towers[towerId].disks.length === 0) {
                    return prev; // Can't select empty tower
                }
                return { ...prev, selectedTower: towerId };
            }

            // If same tower is clicked, deselect
            if (prev.selectedTower === towerId) {
                return { ...prev, selectedTower: null };
            }

            // Try to move disk from selected tower to clicked tower
            const fromTower = prev.towers[prev.selectedTower];
            const toTower = prev.towers[towerId];

            if (fromTower.disks.length === 0) {
                return { ...prev, selectedTower: null };
            }

            const movingDisk = fromTower.disks[fromTower.disks.length - 1];
            const topDiskOnTarget = toTower.disks[toTower.disks.length - 1];

            // Check if move is valid (can only place smaller disk on larger disk)
            if (topDiskOnTarget && movingDisk.size > topDiskOnTarget.size) {
                return { ...prev, selectedTower: null }; // Invalid move
            }

            // Perform the move
            const newTowers = prev.towers.map((tower) => {
                if (tower.id === prev.selectedTower) {
                    return { ...tower, disks: tower.disks.slice(0, -1) };
                }
                if (tower.id === towerId) {
                    return { ...tower, disks: [...tower.disks, movingDisk] };
                }
                return tower;
            });

            // Check if game is complete (all disks on tower 2)
            const isComplete = newTowers[2].disks.length === diskCount;

            return {
                towers: newTowers,
                moves: prev.moves + 1,
                isComplete,
                selectedTower: null,
            };
        });
    }, [diskCount]);

    const reset = useCallback(() => {
        setGameState(createInitialState(diskCount));
    }, [diskCount]);

    const moveDisk = useCallback((fromTowerId: number, toTowerId: number) => {
        setGameState((prev) => {
            const fromTower = prev.towers[fromTowerId];
            const toTower = prev.towers[toTowerId];

            if (fromTower.disks.length === 0) {
                return prev; // No disk to move
            }

            const movingDisk = fromTower.disks[fromTower.disks.length - 1];
            const topDiskOnTarget = toTower.disks[toTower.disks.length - 1];

            // Check if move is valid
            if (topDiskOnTarget && movingDisk.size > topDiskOnTarget.size) {
                return prev; // Invalid move
            }

            // Perform the move
            const newTowers = prev.towers.map((tower) => {
                if (tower.id === fromTowerId) {
                    return { ...tower, disks: tower.disks.slice(0, -1) };
                }
                if (tower.id === toTowerId) {
                    return { ...tower, disks: [...tower.disks, movingDisk] };
                }
                return tower;
            });

            // Check if game is complete
            const isComplete = newTowers[2].disks.length === diskCount;

            return {
                towers: newTowers,
                moves: prev.moves + 1,
                isComplete,
                selectedTower: null,
            };
        });
    }, [diskCount]);

    return {
        gameState,
        selectTower,
        moveDisk,
        reset,
    };
};
