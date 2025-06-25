import {useState} from 'react';
import PageEditor from '../PageEditor';
import PageNav from '../PageNav';

export type Page = {  
  id: string;
  name: string;
  icon: string;
};

function FormBuilder() {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      name: 'Info',
      icon: 'info',
    },
    {
      id: '2',
      name: 'Details',
      icon: 'details',
    },
    {
      id: '3',
      name: 'Others',
      icon: 'more_horiz',
    },
    {
      id: '4',
      name: 'Ending',
      icon: 'check_circle',
    }
  ]);
  
  const [currentPageId, setCurrentPageId] = useState<Page['id'] | null>(null);

  const onPageAdd = (pageName: string, pageIndex?: number) => {
    if (!pageName) {
      console.error("Page name is required");
      return;
    }

    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID, will get it from backend later
      name: pageName,
      icon: 'page' // Default icon for new pages
    };

    if (! pageIndex ) {
      // Add the new page at the end of the list
      setPages([...pages, newPage]);
    } else {
      // Insert the new page at the specified index
      const updatedPages = [...pages];
      updatedPages.splice(pageIndex, 0, newPage);
      setPages(updatedPages);
    }

    setCurrentPageId(newPage.id);
  }

  const onPageDrag = (draggedPageIndex: number, dragOverPageIndex: number) => {
    if (draggedPageIndex === null || dragOverPageIndex === null) {
      return;
    }

    const updatedPages = [...pages];
    const [draggedPage] = updatedPages.splice(draggedPageIndex, 1);
    updatedPages.splice(dragOverPageIndex, 0, draggedPage); 

    setPages(updatedPages);
  }

  return (
    <div>
      <PageEditor currentPageId={currentPageId}/>
      <PageNav 
        currentPageId={currentPageId}
        onPageSelection={setCurrentPageId}
        pages={pages}
        onPageAdd={onPageAdd}
        onPageDrag={onPageDrag}
      />
    </div>
  );
}

export default FormBuilder;