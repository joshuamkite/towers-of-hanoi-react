export interface Disk {
    id: number;
    size: number;
}

export interface Tower {
    id: number;
    disks: Disk[];
}

export interface GameState {
    towers: Tower[];
    moves: number;
    isComplete: boolean;
    selectedTower: number | null;
}
