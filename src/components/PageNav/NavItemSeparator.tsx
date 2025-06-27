import { useState } from "react";
import type { Page } from "../FormBuilder";
import PlusIcon from '../common/icons/Plus';

export default function NavItemSeparator({
  pageId,
  index,
  totalPages,
  onAddPageClick,
  draggedPageId
}: {
  pageId: Page['id'];
  index: number;
  totalPages: number;
  onAddPageClick: (pageIndex?: number) => void;
  draggedPageId: Page['id'] | null;
}) {
  const [ hoveredPageIndex, setHoveredPageIndex ] = useState<number | null>(null);
  
  const handleMouseHoverOnSeparator = (index: number) => {
    // Skip if dragging
    if (draggedPageId) {
      return;
    }

    // Prevent hover effect on the last page separator, it has an explicit add button
    if (index === totalPages - 1) {
      return;
    }
    setHoveredPageIndex(index);
  }
  
  return (
    <>
      <span
        className={
          `flex items-center page-separator-container relative h-[32px]
          ${hoveredPageIndex === index ? 'w-[56px]' : 'w-[20px]'}
          ${draggedPageId && pageId === draggedPageId ? 'pointer-events-none' : ''}
        `}
        style={{ transition: 'width 0.3s ease' }}
        onMouseEnter={() => handleMouseHoverOnSeparator(index)}
        onMouseLeave={() => setHoveredPageIndex(null)}
      >
        <hr 
          className="h-[1px] w-full p-0 border-0 border-b-[1.8px] border-dashed border-[#C0C0C0]"
          aria-hidden="true"
          data-testid={`page-separator-${index}`}
        />
        { 
          index < totalPages - 1 &&
          hoveredPageIndex === index &&
          <button 
            className="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex justify-center items-center w-4 h-4 bg-white hover:bg-gray-100 border border-solid border-0.5px border-[#E1E1E1] focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-fillout-blue-600 cursor-pointer shadow-sm rounded-[50%]" 
            onClick={() => onAddPageClick(index+1)}
            aria-label="Add new page between pages"
            data-testid={`add-page-button-${index}`}
            title="Add new page between pages"
          >
            <PlusIcon className="w-[8px] h-[8px]"/>
          </button>
        }
      </span>
    </>
  );
};