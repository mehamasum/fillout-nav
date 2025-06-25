import type { Page } from '../FormBuilder';
interface PageNavProps {  
  pages: Page[];
  currentPageId: Page['id'] | null;
  onPageSelection: (pageId: Page['id'] | null) => void;
  onPageAdd: (pageName: Page['name']) => void;
  onPageDrag: (draggedPageIndex: number, dragOverPageIndex: number) => void;
}
function PageNav({
  pages,
  currentPageId,
  onPageSelection,
  onPageAdd,
  onPageDrag,
}: PageNavProps) {
  let draggedPageIndex: number | null;
  let dragOverPageIndex: number | null;

  const onAddPageClick = () => {
    const pageName = prompt("Page name:");
  
    if (! pageName ) {
      console.error("Page name is required");
      return;
    }
  
    onPageAdd(pageName);
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

  const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // todo: any logic to handle drag over?
  }

  return (
    <div>
      {
        pages.map((page, index) => (
          <button
            key={page.id}
            onClick={() => onPageSelection(page.id)}
            style={{
              backgroundColor: page.id === currentPageId ? 'lightblue' : 'white',
              margin: '5px',
              padding: '10px',
              border: '1px solid #ccc',
              cursor: 'pointer'
            }}
            draggable
            onDragStart={() => (onDragStart(index))}
            onDragEnter={() => (onDragEnter(index))}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            {page.name}
          </button>
        ))
      }
      <button
        onClick={onAddPageClick}
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
