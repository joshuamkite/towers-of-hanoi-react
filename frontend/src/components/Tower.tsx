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

    // Same width formula as Disk's widthPercent (size/totalDisks * 80 + 20), so
    // "2 rings worth bigger than the bottom disc" scales with however big a size
    // step currently is, instead of a fixed percentage that would look right only
    // at one disc count. Capped, since at low disc counts (e.g. 3) a size step is
    // huge and this would otherwise make adjacent towers' bases overlap.
    const baseWidthPercent = 100 + Math.min(2 * (80 / totalDisks), 24);

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
                <div className="tower-base" style={{ width: `${baseWidthPercent}%` }}>
                    <span className="tower-base-face" />
                </div>
            </div>
        </div>
    );
};
