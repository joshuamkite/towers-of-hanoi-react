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
    enableDrag: boolean;
}

export const Tower = ({
    tower,
    isSelected,
    onSelect,
    totalDisks,
    onDragStart,
    onDrop,
    onDragOver,
    enableDrag
}: TowerProps) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        onSelect();
    };

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
                className={`tower ${isSelected ? 'selected' : ''} ${isDragOver && enableDrag ? 'drag-over' : ''}`}
                onClick={handleClick}
                onTouchEnd={handleClick}
                onDrop={enableDrag ? handleDrop : undefined}
                onDragOver={enableDrag ? handleDragOver : undefined}
                onDragLeave={enableDrag ? handleDragLeave : undefined}
            >
                <div
                    className="tower-pole"
                    style={{ '--disc-count': totalDisks } as React.CSSProperties}
                >
                    <span className="tower-pole-cap" />
                    <span className="tower-pole-bottom" />
                </div>
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
                <div className="tower-base">
                    <span className="tower-base-face" />
                </div>
            </div>
        </div>
    );
};
