import type { Tower as TowerType } from '../types';
import { Disk } from './Disk';
import '../styles/Tower.css';

interface TowerProps {
    tower: TowerType;
    isSelected: boolean;
    onSelect: () => void;
    totalDisks: number;
}

export const Tower = ({ tower, isSelected, onSelect, totalDisks }: TowerProps) => {
    return (
        <div className="tower-container">
            <div
                className={`tower ${isSelected ? 'selected' : ''}`}
                onClick={onSelect}
            >
                <div className="tower-pole"></div>
                <div className="disk-stack">
                    {tower.disks.map((disk) => (
                        <Disk key={disk.id} disk={disk} totalDisks={totalDisks} />
                    ))}
                </div>
                <div className="tower-base"></div>
            </div>
            <div className="tower-label">Tower {tower.id + 1}</div>
        </div>
    );
};
