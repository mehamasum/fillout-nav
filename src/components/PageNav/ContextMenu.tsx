import { useEffect, useRef, useState } from 'react';

import FlagIcon from '../common/icons/Flag';
import PencilIcon from '../common/icons/Pencil';
import ClipboardIcon from '../common/icons/Clipboard';
import DuplicateIcon from '../common/icons/Duplicate';
import TrashcanIcon from '../common/icons/Trashcan';

import ContextMenuItem from './ContextMenuItem';


const CONTEXT_MENU_ITEMS = [
  { icon: <FlagIcon className="text-fillout-gray-400" />, text: 'Set as first page', action: () => console.log('Set as first page clicked') },
  { icon: <PencilIcon className="text-fillout-gray-400" />, text: 'Rename', action: () => console.log('Rename clicked') },
  { icon: <ClipboardIcon className="text-fillout-gray-400" />, text: 'Copy', action: () => console.log('Copy clicked') },
  { icon: <DuplicateIcon className="text-fillout-gray-400" />, text: 'Duplicate', action: () => console.log('Duplicate clicked') },
  { divider: true },
  { icon: <TrashcanIcon className="text-fillout-gray-400" />, text: 'Delete', action: () => console.log('Delete clicked'), danger: true },
];

interface ContextMenuProps {
  trapFocus?: boolean;
  onClose: () => void;
}

function ContextMenu({
  trapFocus = false,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-expect-error We are not using this state directly
  const [focusedIndex, setFocusedIndex] = useState(0);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const focusItem = (index: number) => {
    const menuItem = menuRef.current?.querySelectorAll('[role="menuitem"]')[index] as HTMLElement;
    if (menuItem) {
      menuItem.focus();
    }
  };

  useEffect(() => {
    if (!lastFocusedElement.current) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
    }
    if (trapFocus) {
      focusItem(0);
    }
  }, [trapFocus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          break;

        case 'Escape':
          event.preventDefault();
          if (lastFocusedElement.current) {
            lastFocusedElement.current.focus();
            lastFocusedElement.current = null;
          }
          onClose();
          break;
          
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prevIndex => {
            const nextIndex = prevIndex < CONTEXT_MENU_ITEMS.length - 1 ? prevIndex + 1 : 0;
            focusItem(nextIndex);
            return nextIndex;
          });
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prevIndex => {
            const nextIndex = prevIndex > 0 ? prevIndex - 1 : CONTEXT_MENU_ITEMS.length - 1;
            focusItem(nextIndex);
            return nextIndex;
          });
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      if (element.closest('.context-menu-trigger')) return;
      if (!element.closest('.context-menu-container')) {
        onClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="context-menu-container absolute top-auto bottom-full left-0 z-100 w-60 mb-2.5 origin-bottom-left bg-white shadow-lg border border-gray-200 rounded-lg"
      role="menu"
      aria-label="Page settings"
      data-testid="context-menu"
    >
      <div className="flex items-center px-3 py-2 text-base capitalize bg-fillout-gray-50 cursor-default rounded-t-lg">
        <span className="font-bold" role="heading" aria-level={3}>Settings</span>
      </div>

      <hr className="border-gray-200" aria-hidden="true"/>
      
      <div className="p-1.5" role="group" aria-label="Page actions" data-testid="context-menu-items">
      {
        CONTEXT_MENU_ITEMS.map((item, index) => {
          if (item.divider) {
            return <hr key={`divider-${index}`} className="border-gray-200 my-1.5" aria-hidden="true"/>;
          }

          return (
            <ContextMenuItem
              key={index}
              icon={item.icon}
              text={item.text as string}
              onClick={() => item.action && item.action()}
              danger={item.danger}
            />
          );
        })
      }
      </div>
    </div>
  );
}

export default ContextMenu;