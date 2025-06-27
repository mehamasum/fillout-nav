import { useEffect, useState } from 'react';
import type { Page } from '../FormBuilder';
import NavItem from './NavItem';
import PlusIcon from '../common/icons/Plus';
import Button from '../common/Button';
import NavItemSeparator from './NavItemSeparator';

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
  activePageId: Page['id'] | null; // todo: rename to activePageId
  onNavItemClicked: (pageId: Page['id'] | null) => void;
  onPageAdd: (pageIndex?: number) => void;
  onPageDragEnd: (draggedPageId: Page['id'], overPageId: Page['id']) => void;
}
function PageNav({
  pages,
  activePageId,
  onNavItemClicked,
  onPageAdd,
  onPageDragEnd
}: PageNavProps) {
  const [ openContextMenu, setOpenContextMenu ] = useState<Page['id'] | null>(null);
  const [ draggedPageId, setDraggedPageId ] = useState<Page['id'] | null>(null);

  const onAddPageClick = (pageIndex?: number) => {
    onPageAdd(pageIndex);
  }

  const handlePageSelection = (pageId: Page['id']) => {
    if (activePageId === pageId) {
      return;
    } 
    
    onNavItemClicked(pageId);
    setOpenContextMenu(null); // Close context menu on page selection
  }

  const handleContextMenuOpen = (pageId: Page['id']) => {
    if (openContextMenu === pageId) {
      setOpenContextMenu(null);
    } else {
      setOpenContextMenu(pageId);
    }
  }

  // Close context menu on click outside
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
                  <NavItem
                    pageId={page.id}
                    icon={page.icon}
                    onClick={() => handlePageSelection(page.id)}
                    active={page.id === activePageId}
                    pageName={page.name}
                    contextMenuOpen={openContextMenu === page.id}
                    onContextMenuOpen={() => handleContextMenuOpen(page.id)}
                  />
                  <NavItemSeparator
                    pageId={page.id}
                    index={index}
                    totalPages={pages.length}
                    onAddPageClick={onAddPageClick}
                    draggedPageId={draggedPageId}
                  />
                </span>
              );
            })
          }
        </SortableContext>
      </DndContext>
      <div data-testid="add-page-button">
          <Button
            icon={<PlusIcon className="w-[16px] h-[16px]"/>}
            text="Add Page"
            onClick={() => onAddPageClick()}
            ariaLabel='Add new page at the end'
          />
      </div>
    </div>
  );
}

export default PageNav;
