import type { Page } from '../FormBuilder';

interface PageNavProps {  
  pages: Page[];
  currentPageId: Page['id'] | null;
  onPageSelection: (pageId: Page['id'] | null) => void;
}

function PageNav({
  pages,
  currentPageId,
  onPageSelection
}: PageNavProps) {
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
    </div>
  );
}

export default PageNav;
