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
}

function PageNavItem({
  pageName,
  active,
  onClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
}: PageNavItemProps) {
  return (
   <>
    <button
      type="button"
      onClick={onClick}
      className={`page-nav-item ${active ? 'active' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {pageName}
    </button>
   </>
  );
}

export default PageNavItem;
