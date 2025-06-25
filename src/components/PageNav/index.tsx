import { useEffect, useState } from 'react';
import type { Page } from '../FormBuilder';
import PageNavItem from './PageNavItem';
import PlusIcon from '../common/icons/Plus';

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openContextMenu) {
        const element = event.target as HTMLElement;

        // Skip if the click is to trigger the context menu
        if (element.closest('.context-menu-trigger')) {
          return;
        }

        // Close the context menu if the click is outside of it's container
        if (!element.closest('.context-menu-container')) {
          setOpenContextMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openContextMenu]);

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
        className="inline-flex items-center px-3 py-2 text-black leading-4 font-medium capitalize bg-white rounded-md hover:bg-gray-50 border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
        onClick={() => onAddPageClick()}
      >
        <PlusIcon/>          
        <span className="mx-1">Add Page</span>
      </button>
    </div>
  );
}

export default PageNav;
