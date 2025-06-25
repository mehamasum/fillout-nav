import { useEffect, useState } from 'react';
import type { Page } from '../FormBuilder';
import PageNavItem from './PageNavItem';
import PlusIcon from '../common/icons/Plus';
import Button from '../common/Button';

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
  const [ hoveredPageIndex, setHoveredPageIndex ] = useState<number | null>(null);

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

  const handleMouseHoverOnSeparator = (index: number) => {
    // Prevent hover effect on the last page separator, it has an explicit add button
    if (index === pages.length - 1) {
      return;
    }
    setHoveredPageIndex(index);
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
    <div className="flex items-center mx-4">
      <>
        {
          pages.map((page, index) => {
            return (
                <span key={page.id} className="flex items-center">
                  <PageNavItem
                    icon={page.icon}
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
                  <>
                    <span
                      className={`page-separator-container relative ${hoveredPageIndex === index ? 'page-separator-container-on-hover' : ''} flex items-center`}
                      onMouseEnter={() => handleMouseHoverOnSeparator(index)}
                      onMouseLeave={() => setHoveredPageIndex(null)}
                    >
                      <hr 
                        className='page-separator'
                      />
                      { 
                        index < pages.length - 1 &&
                        hoveredPageIndex === index &&
                        <button 
                          className="page-separator-page-add absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2" 
                          onClick={() => onAddPageClick(index+1)}
                        >
                          +
                        </button>
                      }
                    </span>
                  </>
              </span>
            );
          })
        }
      </>
      <div>
          <Button
          icon={<PlusIcon/>}
          text="Add Page"
          onClick={() => onAddPageClick()}
        />
      </div>
    </div>
  );
}

export default PageNav;
