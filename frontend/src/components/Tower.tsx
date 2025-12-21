import { useState } from 'react';
import type { Tower as TowerType } from '../types';
import { Disk } from './Disk';
import '../styles/Tower.css';

interface TowerProps {
    tower: TowerType;
    isSelected: boolean;
    onSelect: () => void;
    totalDisks: number;
    onDragStart: (towerId: number) => void;
    onDrop: (toTowerId: number) => void;
    onDragOver: (e: React.DragEvent) => void;
}

export const Tower = ({
    tower,
    isSelected,
    onSelect,
    totalDisks,
    onDragStart,
    onDrop,
    onDragOver
}: TowerProps) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        onDrop(tower.id);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver(e);
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    return (
        <div className="tower-container">
            <div
                className={`tower ${isSelected ? 'selected' : ''} ${isDragOver ? 'drag-over' : ''}`}
                onClick={onSelect}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="tower-pole"></div>
                <div className="disk-stack">
                    {tower.disks.map((disk, index) => (
                        <Disk
                            key={disk.id}
                            disk={disk}
                            totalDisks={totalDisks}
                            isTopDisk={index === tower.disks.length - 1}
                            towerId={tower.id}
                            onDragStart={onDragStart}
                        />
                    ))}
                </div>
                <div className="tower-base"></div>
            </div>
            <div className="tower-label">Tower {tower.id + 1}</div>
        </div>
    );
};
