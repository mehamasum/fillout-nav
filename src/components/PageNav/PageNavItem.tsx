import FlagIcon from '../common/icons/Flag';
import PencilIcon from '../common/icons/Pencil';
import ClipboardIcon from '../common/icons/Clipboard';
import DuplicateIcon from '../common/icons/Duplicate';
import TrashcanIcon from '../common/icons/Trashcan';


import type { Page } from '../FormBuilder';

import './PageNavItem.css';

interface PageNavItemProps {  
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
      className={`page-nav-item relative inline-block ${active ? 'active' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {pageName}

      {active && <button 
          className="context-menu-trigger" 
          onClick={onContextMenuOpen}
        >
          ⋮
        </button>
      }

      { contextMenuOpen && (
        <div className="absolute right-0 z-100 w-48 py-2 mt-2 origin-top-right bg-white rounded-lg shadow-md">
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
