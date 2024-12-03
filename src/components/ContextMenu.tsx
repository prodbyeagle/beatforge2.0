import React, { useEffect, useRef } from 'react';
import { Track } from '../types/Track';

interface ContextMenuProps {
  x: number;
  y: number;
  track: Track;
  onClose: () => void;
  onEdit?: (track: Track) => void;
  onPlay?: (track: Track) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, track, onClose, onEdit, onPlay }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    top: y,
    left: x,
    zIndex: 1000,
  };

  return (
    <div
      ref={menuRef}
      className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg shadow-lg p-1 min-w-[200px]"
      style={menuStyle}
    >
      <ul className="text-sm">
        <li>
          <button
            onClick={() => {
              onEdit?.(track);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-[var(--theme-border)] rounded-md transition-all duration-300"
          >
            Edit Song
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              onPlay?.(track);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-[var(--theme-border)] rounded-md transition-all duration-300"
          >
            Play Song
          </button>
        </li>
        <li>
          <button
            disabled
            className="w-full px-4 py-2 text-left text-[var(--theme-text)] opacity-50 cursor-default"
          >
            Add to Queue
          </button>
        </li>
        <li>
          <button
            disabled
            className="w-full px-4 py-2 text-left text-[var(--theme-text)] opacity-50 cursor-default"
          >
            Go to Album
          </button>
        </li>
        <li>
          <button
            disabled
            className="w-full px-4 py-2 text-left text-[var(--theme-text)] opacity-50 cursor-default"
          >
            Go to Artist
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;