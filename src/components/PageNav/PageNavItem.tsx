import FlagIcon from '../common/icons/Flag';
import PencilIcon from '../common/icons/Pencil';
import ClipboardIcon from '../common/icons/Clipboard';
import DuplicateIcon from '../common/icons/Duplicate';
import TrashcanIcon from '../common/icons/Trashcan';


import type { Page } from '../FormBuilder';

import './PageNavItem.css';

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
      className={`page-nav-item cursor-pointer relative inline-flex items-center px-3 py-2 text-[#677289] leading-4 font-medium capitalize bg-[#9da4b226] rounded-md hover:bg-[#9da4b259] border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm ${active ? 'active' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <span className="inline-flex gap-2 items-center">{icon} {pageName}</span>

      {active && <button 
          className="context-menu-trigger" 
          onClick={onContextMenuOpen}
        >
          ⋮
        </button>
      }

      { contextMenuOpen && (
        <div className="context-menu-container absolute top-auto bottom-full left-0 z-100 w-48 py-2 mb-4 origin-bottom-left bg-white rounded-lg shadow-md">
          <div className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
            <FlagIcon/>
            <span className="mx-1">Set as first page</span>
          </div>

          <div className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
            <PencilIcon/>
            <span className="mx-1">Rename</span>
          </div>

          <div className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
            <ClipboardIcon/>
            <span className="mx-1">Copy</span>
          </div>

          <div className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
            <DuplicateIcon/>
            <span className="mx-1">Duplicate</span>
          </div>

          <hr className="border-gray-200"/>

          <div className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 ">
            <TrashcanIcon/>
            <span className="mx-1">Delete</span>
          </div>
        </div> 
     )}
    </div>
   </>
  );
}

export default PageNavItem;
