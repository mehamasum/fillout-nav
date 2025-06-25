import type { Page } from '../FormBuilder';

interface PageNavProps {  
  pages: Page[];
  currentPageId: Page['id'] | null;
  onPageSelection: (pageId: Page['id'] | null) => void;
  onPageAdd: (pageName: Page['name']) => void;
}
function PageNav({
  pages,
  currentPageId,
  onPageSelection,
  onPageAdd
}: PageNavProps) {
  const onAddPageClick = () => {
    const pageName = prompt("Page name:");
  
    if (! pageName ) {
      console.error("Page name is required");
      return;
    }
  
    onPageAdd(pageName);
  }  

  return (
    <div>
      {
        pages.map((page) => (
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
