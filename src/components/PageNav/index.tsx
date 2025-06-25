import { useState } from 'react';
import type { Page } from '../FormBuilder';
import PageNavItem from './PageNavItem';

import './index.css';

interface PageNavProps {  
  pages: Page[];
  currentPageId: Page['id'] | null; // todo: rename to activePageId
  onPageSelection: (pageId: Page['id'] | null) => void;
  onPageAdd: (pageName: Page['name'], pageIndex?: number) => void;
  onPageDrag: (draggedPageIndex: number, dragOverPageIndex: number) => void;
}
function PageNav({
  pages,
  currentPageId,
  onPageSelection,
  onPageAdd,
  onPageDrag,
}: PageNavProps) {
  const [openContextMenu, setOpenContextMenu] = useState<Page['id'] | null>(null);

  let draggedPageIndex: number | null;
  let dragOverPageIndex: number | null;

  const onAddPageClick = (pageIndex?: number) => {
    onPageAdd("New Page", pageIndex);
  }

  const onDragStart = (index: number) => {
    draggedPageIndex = index;
    dragOverPageIndex = null;
  }

  const onDragEnter = (index: number) => {
    dragOverPageIndex = index;
  }

  const onDragEnd = () => {
    if (draggedPageIndex === null || dragOverPageIndex === null) {
      return;
    }

    onPageDrag(draggedPageIndex, dragOverPageIndex);


    draggedPageIndex = null;
    dragOverPageIndex = null;
  }

  const onDragOver = () => {
    // todo: any logic to handle drag over?
  }

  const handlePageSelection = (pageId: Page['id']) => {
    if (currentPageId === pageId) {
      return;
    } 
    
    onPageSelection(pageId);
    setOpenContextMenu(null); // Close context menu on page selection
  }

  const handleContextMenuOpen = (pageId: Page['id']) => {
    if (openContextMenu === pageId) {
      setOpenContextMenu(null);
    } else {
      setOpenContextMenu(pageId);
    }
  }

  return (
    <div>
      {
        pages.map((page, index) => {
          return (
              <span key={page.id}>
                <PageNavItem
                  onClick={() => handlePageSelection(page.id)}
                  active={page.id === currentPageId}
                  pageName={page.name}
                  onDragStart={() => (onDragStart(index))}
                  onDragEnter={() => (onDragEnter(index))}
                  onDragEnd={onDragEnd}
                  onDragOver={onDragOver}
                  contextMenuOpen={openContextMenu === page.id}
                  onContextMenuOpen={() => handleContextMenuOpen(page.id)}
                />
                { index < pages.length - 1 && <span>
                  <hr className='page-separator'/>
                  <button className='page-separator-page-add' onClick={() => onAddPageClick(index+1)}>+</button>
                </span> }
            </span>
          );
        })
      }
      <button
        onClick={() => onAddPageClick()}
        style={{
          margin: '5px',
          padding: '10px',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
      >
        Add Page
      </button>
    </div>
  );
}

export default PageNav;
