import type { Disk as DiskType } from '../types';
import '../styles/Disk.css';

interface DiskProps {
    disk: DiskType;
    totalDisks: number;
}

export const Disk = ({ disk, totalDisks }: DiskProps) => {
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

    return (
        <div
            className="disk"
            style={{
                width: `${widthPercent}%`,
                backgroundColor: color,
            }}
        >
            {disk.size}
        </div>
    );
};
