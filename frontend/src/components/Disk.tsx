import { useMemo } from 'react';
import type { Disk as DiskType } from '../types';
import '../styles/Disk.css';

interface DiskProps {
    disk: DiskType;
    totalDisks: number;
    isTopDisk: boolean;
    towerId: number;
    onDragStart: (towerId: number) => void;
}

export const Disk = ({ disk, totalDisks, isTopDisk, towerId, onDragStart }: DiskProps) => {
    // Detect if device supports touch - only check once
    const isTouchDevice = useMemo(() =>
        'ontouchstart' in window || navigator.maxTouchPoints > 0
        , []);

    const widthPercent = (disk.size / totalDisks) * 80 + 20; // 20% to 100% width
    const colors = [
        '#3b82f6', // blue
        '#8b5cf6', // purple
        '#ec4899', // pink
        '#f59e0b', // amber
        '#10b981', // green
        '#06b6d4', // cyan
        '#f97316', // orange
        '#6366f1', // indigo
    ];

    const color = colors[disk.id % colors.length];

    const handleDragStart = (e: React.DragEvent) => {
        if (isTopDisk && !isTouchDevice) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', towerId.toString());
            onDragStart(towerId);
        } else {
            e.preventDefault();
        }
    };

    // Disable drag on touch devices
    const isDraggable = isTopDisk && !isTouchDevice;

    return (
        <div
            className={`disk ${isTopDisk ? 'draggable' : 'not-draggable'}`}
            draggable={isDraggable}
            onDragStart={handleDragStart}
            style={{
                width: `${widthPercent}%`,
                cursor: isTopDisk ? 'pointer' : 'default',
                '--disk-color': color,
            } as React.CSSProperties}
        >
            <span className="disk-wall" />
            <span className="disk-cap" />
            <span className="disk-bottom" />
        </div>
    );
};
