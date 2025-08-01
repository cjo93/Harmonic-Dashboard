import React, { ReactNode, useState } from 'react';

interface DashboardTileProps {
  title: string;
  children: ReactNode;
  minWidth?: number;
  minHeight?: number;
}

const DashboardTile: React.FC<DashboardTileProps> = ({ title, children, minWidth = 320, minHeight = 200 }) => {
  const [size, setSize] = useState({ width: minWidth, height: minHeight });
  const [resizing, setResizing] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setResizing(true);
    setStart({ x: e.clientX, y: e.clientY, width: size.width, height: size.height });
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (resizing && start) {
      setSize({
        width: Math.max(minWidth, start.width + (e.clientX - start.x)),
        height: Math.max(minHeight, start.height + (e.clientY - start.y)),
      });
    }
  };

  const onMouseUp = () => {
    setResizing(false);
    setStart(null);
  };

  React.useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  }, [resizing, start]);

  return (
    <div
      className="bg-black text-white border border-gold rounded-lg shadow-lg p-4 mb-6 relative select-none"
      style={{ width: size.width, height: size.height, minWidth, minHeight }}
    >
      <div className="font-serif text-lg font-bold text-gold mb-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="cursor-move text-xs text-gray-400">&#x2630;</span>
      </div>
      <div className="overflow-auto h-full">
        {children}
      </div>
      <div
        className="absolute bottom-1 right-1 w-4 h-4 cursor-se-resize z-10"
        onMouseDown={onMouseDown}
        style={{ userSelect: 'none' }}
        title="Resize"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 14L14 2M6 14L14 6M10 14L14 10" stroke="#FFD700" strokeWidth="2" /></svg>
      </div>
    </div>
  );
};

export default DashboardTile;
