import { useEffect, useState } from 'react';
import type { Page } from '../FormBuilder';
import PageNavItem from './PageNavItem';
import PlusIcon from '../common/icons/Plus';
import Button from '../common/Button';

import './index.css';
import { 
  DndContext, 
  type DragEndEvent, 
  useSensor, 
  useSensors,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  type DragStartEvent,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';


interface PageNavProps {  
  pages: Page[];
  currentPageId: Page['id'] | null; // todo: rename to activePageId
  onPageSelection: (pageId: Page['id'] | null) => void;
  onPageAdd: (pageName: Page['name'], pageIndex?: number) => void;
  onPageDragEnd: (activePageId: Page['id'], overPageId: Page['id']) => void;
}
function PageNav({
  pages,
  currentPageId,
  onPageSelection,
  onPageAdd,
  onPageDragEnd
}: PageNavProps) {
  const [openContextMenu, setOpenContextMenu] = useState<Page['id'] | null>(null);
  const [ hoveredPageIndex, setHoveredPageIndex ] = useState<number | null>(null);
  const [ draggedPageId, setDraggedPageId ] = useState<Page['id'] | null>(null);

  const onAddPageClick = (pageIndex?: number) => {
    onPageAdd("New Page", pageIndex);
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
    // Skip if dragging
    if (draggedPageId) {
      return;
    }

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


  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setOpenContextMenu(null);

    setDraggedPageId(active.id as Page['id']);
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e; 

    if (over === null || active.id === over.id) {
      setDraggedPageId(null);
      return;
    }

    onPageDragEnd(active.id as Page['id'], over.id as Page['id']);
    setDraggedPageId(null);
  };

  const handleDragCancel = () => {
    setDraggedPageId(null);
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {
    keyboardCodes: {
      start: ['Space'],
      cancel: ['Escape'],
      end: ['Space']
    }
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );

  return (
    <div className="flex items-center mx-4">
      <DndContext 
          sensors={sensors} 
          onDragStart={handleDragStart} 
          onDragEnd={handleDragEnd} 
          onDragAbort={handleDragCancel}
          onDragCancel={handleDragCancel}
          modifiers={[restrictToHorizontalAxis]}
        >
        <SortableContext items={pages} strategy={horizontalListSortingStrategy}>
          {
            pages.map((page, index) => {
              return (
                  <span key={page.id} className={`flex items-center ${draggedPageId && page.id !== draggedPageId ? 'pointer-events-none' : ''}`}>
                    <PageNavItem
                      pageId={page.id}
                      icon={page.icon}
                      onClick={() => handlePageSelection(page.id)}
                      active={page.id === currentPageId}
                      pageName={page.name}
                      contextMenuOpen={openContextMenu === page.id}
                      onContextMenuOpen={() => handleContextMenuOpen(page.id)}
                    />
                    <>
                      <span
                        className={
                          `flex items-center page-separator-container relative 
                          ${hoveredPageIndex === index ? 'page-separator-container-on-hover' : ''}
                          ${draggedPageId && page.id === draggedPageId ? 'pointer-events-none' : ''}
                        `}
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
                            className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex justify-center items-center w-4 h-4 bg-white hover:bg-gray-100 border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-blue-500 cursor-pointer shadow-sm rounded-[50%]" 
                            onClick={() => onAddPageClick(index+1)}
                          >
                            <PlusIcon className="w-[8px] h-[8px]"/>
                          </button>
                        }
                      </span>
                    </>
                </span>
              );
            })
          }
        </SortableContext>
      </DndContext>
      <div>
          <Button
            icon={<PlusIcon className="w-[16px] h-[16px]"/>}
            text="Add Page"
            onClick={() => onAddPageClick()}
          />
      </div>
    </div>
  );
}

export default PageNav;
