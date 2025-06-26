
import KebabIcon from '../common/icons/Kebab';

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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onContextMenuOpen();
  };

  return (
   <>
    <div
      onClick={onClick}
      onContextMenu={handleContextMenu}
      className={`page-nav-item cursor-pointer relative inline-flex items-center px-3 py-2 leading-4 font-medium capitalize bg-[#9da4b226] rounded-md hover:bg-[#9da4b259] border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm text-[#677289] ${active ? 'bg-white text-fillout-dark hover:bg-gray-100' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <span className="inline-flex gap-1.5 items-center">{icon} {pageName}</span>

      {active && <button 
          className="context-menu-trigger ml-2 hover:bg-gray-100 cursor-pointer" 
          onClick={onContextMenuOpen}
        >
          <KebabIcon/>
        </button>
      }

      { contextMenuOpen && <ContextMenu/> }
    </div>
   </>
  );
}

export default PageNavItem;
