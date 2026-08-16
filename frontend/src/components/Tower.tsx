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
                    {/* The pole, rendered as one more (very tall, very narrow) "ring" stacked
                        above the real discs, using the exact same cap/wall/bottom construction
                        and the exact same margin-top overlap that lets each ring's cap show as a
                        rim under the one above it - so the pole "meets" the top disc (or the
                        base, if empty) the same way rings meet each other, instead of a
                        separately-positioned rod that just vanishes into it. Its height is
                        whatever's left of a fixed "totalDisks + 2 rings tall" budget after the
                        real discs on this tower - so the pole is always the same total height
                        above the base regardless of how loaded this particular tower is, while
                        still visually resting on top of however many real discs are here. */}
                    <div
                        className="disk pole-ring"
                        style={{
                            '--total-disks': totalDisks,
                            '--real-disc-count': tower.disks.length,
                            '--disk-color': 'var(--tower-pole)',
                        } as React.CSSProperties}
                    >
                        <span className="disk-wall" />
                        <span className="disk-cap" />
                        <span className="disk-bottom" />
                    </div>
                </div>
                <div className="tower-base">
                    <span className="tower-base-face" />
                </div>
            </div>
        </div>
    );
};
