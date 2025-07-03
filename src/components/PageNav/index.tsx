import { useState } from 'react';
import type { Page } from '../FormBuilder';
import NavItem from './NavItem';
import PlusIcon from '../common/icons/Plus';
import Button from '../common/Button';
import NavItemSeparator from './NavItemSeparator';

import { 
  DndContext, 
  type DragEndEvent, 
  useSensor, 
  useSensors,
  KeyboardSensor,
  PointerSensor,
  type DragStartEvent,
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

interface PageNavProps {
  pages: Page[];
  activePageId: Page['id'] | null;
  onActivePageChange: (pageId: Page['id'] | null) => void;
  onAddPage: (pageIndex?: number) => void;
  onReorderPages: (draggedPageId: Page['id'], overPageId: Page['id']) => void;
}

function PageNav({
  pages,
  activePageId,
  onActivePageChange,
  onAddPage,
  onReorderPages
}: PageNavProps) {
  const [openContextMenuId, setOpenContextMenuId] = useState<Page['id'] | null>(null);
  const [draggedPageId, setDraggedPageId] = useState<Page['id'] | null>(null);

  const handleAddPage = (pageIndex?: number) => {
    onAddPage(pageIndex);
  };

  const handlePageSelect = (pageId: Page['id']) => {
    if (activePageId === pageId) return;
    onActivePageChange(pageId);
    setOpenContextMenuId(null);
  };

  const handleContextMenuToggle = (pageId: Page['id']) => {
    setOpenContextMenuId(prevId => (prevId === pageId ? null : pageId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setOpenContextMenuId(null);
    setDraggedPageId(event.active.id as Page['id']);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      setDraggedPageId(null);
      return;
    }
    onReorderPages(active.id as Page['id'], over.id as Page['id']);
    setDraggedPageId(null);
  };

  const handleDragCancel = () => {
    setDraggedPageId(null);
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 0.01 }
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    keyboardCodes: {
      start: ['Space'],
      cancel: ['Escape'],
      end: ['Space']
    }
  });

  const sensors = useSensors(keyboardSensor, pointerSensor);

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
          {pages.map((page, index) => (
            <span
              key={page.id}
              className={`flex items-center ${draggedPageId && page.id !== draggedPageId ? 'pointer-events-none' : ''}`}
            >
              <NavItem
                pageId={page.id}
                icon={page.icon}
                onClick={() => handlePageSelect(page.id)}
                active={page.id === activePageId}
                pageName={page.name}
                contextMenuOpen={openContextMenuId === page.id}
                onContextMenuOpen={() => handleContextMenuToggle(page.id)}
                onContextMenuClose={() => setOpenContextMenuId(null)}
              />
              <NavItemSeparator
                pageId={page.id}
                index={index}
                totalPages={pages.length}
                onAddPageClick={handleAddPage}
                draggedPageId={draggedPageId}
              />
            </span>
          ))}
        </SortableContext>
      </DndContext>
      <div data-testid="add-page-button">
        <Button
          icon={<PlusIcon className="w-[16px] h-[16px]" />}
          text="Add Page"
          onClick={() => handleAddPage()}
          ariaLabel="Add new page at the end"
        />
      </div>
    </div>
  );
}

export default PageNav;
