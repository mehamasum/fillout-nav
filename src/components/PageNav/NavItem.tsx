import { useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import isFeatureFlagEnabled from '../../utils/feature-flag';
import Kebab from '../common/icons/Kebab';
import type { Page } from '../FormBuilder';
import ContextMenu from './ContextMenu';

interface ContextMenuTriggerProps {
  isActive: boolean;
  onOpen: () => void;
  setTrapFocus: (value: boolean) => void;
}

function ContextMenuTrigger({ isActive, onOpen, setTrapFocus }: ContextMenuTriggerProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Open context menu"
      className={`
        context-menu-trigger ml-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-fillout-blue-600 rounded
        ${isActive ? 'hover:bg-gray-100' : 'hover:bg-[#9DA4B259]'}
      `}
      onClick={e => {
        e.stopPropagation();
        onOpen();
        setTrapFocus(false);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onOpen();
          setTrapFocus(true);
        }
      }}
    >
      <Kebab className="w-[18px] h-[18px] fill-fillout-gray-400" />
    </div>
  );
}

interface NavItemProps {
  pageId: Page['id'];
  icon: React.ReactNode;
  pageName: Page['name'];
  active: boolean;
  onClick: () => void;
  contextMenuOpen: boolean;
  onContextMenuOpen: () => void;
  onContextMenuClose: () => void;
}

function NavItem({
  pageId,
  icon,
  pageName,
  active,
  onClick,
  contextMenuOpen,
  onContextMenuOpen,
  onContextMenuClose
}: NavItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [trapFocus, setTrapFocus] = useState(false);

  const isContextMenuOnHoverEnabled = useMemo(() => isFeatureFlagEnabled('contextMenuOnHover', false), []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: pageId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTrapFocus(false);
    onContextMenuOpen();
  };

  const activeIcon = active ? <span className="text-fillout-amber-500">{icon}</span> : icon;
  const showContextMenu = active || (isContextMenuOnHoverEnabled && isHovering && !active);

  return (
    <>
      <button
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={onClick}
        onContextMenu={handleContextMenu}
        className={`
          page-nav-item relative inline-flex items-center px-2.5 py-1.5 leading-4 font-medium capitalize bg-[#9DA4B226] rounded-md hover:bg-[#9DA4B259] border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-fillout-blue-600 text-[#677289]
          ${active ? 'bg-white text-fillout-zinc-900 hover:bg-white shadow-sm' : ''}
          ${isDragging ? 'cursor-move' : 'cursor-pointer'}
          transition-colors duration-100 ease-in-out touch-none
        `}
        data-testid="page-nav-item"
        aria-label={`Page: ${pageName}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="inline-flex gap-1.5 items-center">{activeIcon} {pageName}</span>
        {showContextMenu && (
          <ContextMenuTrigger
            isActive={active}
            onOpen={onContextMenuOpen}
            setTrapFocus={setTrapFocus}
          />
        )}
        {contextMenuOpen && <ContextMenu onClose={onContextMenuClose} trapFocus={trapFocus} />}
      </button>
    </>
  );
}

export default NavItem;
