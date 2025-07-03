import type { ReactNode } from 'react';

interface ContextMenuItemProps {
  icon: ReactNode;
  text: string;
  onClick: () => void;
  danger?: boolean;
}

function ContextMenuItem({ icon, text, onClick, danger = false }: ContextMenuItemProps) {
  return (
    <div
      role="menuitem"
      tabIndex={-1}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`cursor-pointer flex items-center w-full px-2 py-1.5 mb-0.5 text-sm capitalize rounded-sm text-left focus:outline-none focus:ring-0 ${danger ? 'hover:bg-red-100 focus:bg-red-100' : 'hover:bg-gray-100 focus:bg-gray-100'}`}
      aria-label={danger ? `${text} (destructive action)` : text}
    >
      <span aria-hidden="true">{icon}</span>
      <span className={`mx-1.5 font-medium ${danger ? 'text-fillout-red-500' : 'text-fillout-zinc-900'}`}>{text}</span>
    </div>
  );
}

export default ContextMenuItem;