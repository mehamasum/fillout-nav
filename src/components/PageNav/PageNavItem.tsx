
import Kebab from '../common/icons/Kebab';

import type { Page } from '../FormBuilder';
import ContextMenu from './ContextMenu';

interface PageNavItemProps {  
  icon: React.ReactNode;
  pageName: Page['name'];
  active: boolean;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnter: () => void;
  onDragEnd: () => void;
  onDragOver: () => void;
  contextMenuOpen: boolean;
  onContextMenuOpen: () => void;
}

function PageNavItem({
  icon,
  pageName,
  active,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  contextMenuOpen,
  onContextMenuOpen,
}: PageNavItemProps) {

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onContextMenuOpen();
  };

  const activeIcon = active ? <span className="text-fillout-yellow">{icon}</span> : icon;

  return (
   <>
    <button
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`page-nav-item cursor-pointer relative inline-flex items-center px-3 py-2 leading-4 font-medium capitalize bg-[#9DA4B226] rounded-md hover:bg-[#9DA4B259] border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 text-[#677289] ${active ? 'bg-white text-fillout-dark hover:bg-white shadow-sm' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <span className="inline-flex gap-1.5 items-center">{activeIcon} {pageName}</span>

      {active && <div 
          role="button"
          tabIndex={0}
          className="context-menu-trigger ml-2 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500" 
          onClick={onContextMenuOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onContextMenuOpen();
            }
          }}
        >
          <Kebab className="w-[16px] h-[16px]" />
        </div>
      }

      { contextMenuOpen && <ContextMenu/> }
    </button>
   </>
  );
}

export default PageNavItem;
