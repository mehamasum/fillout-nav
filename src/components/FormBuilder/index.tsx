import {useState} from 'react';
import PageEditor from '../PageEditor';
import PageNav from '../PageNav';

import InfoIcon from '../common/icons/Info';
import FileIcon from '../common/icons/File';
import CheckIcon from '../common/icons/Check';

export type Page = {  
  id: string;
  name: string;
  icon: React.ReactNode;
};

const DEFAULT_PAGES: Page[] = [
  {
    id: '1',
    name: 'Info',
    icon: <InfoIcon className="w-[20px] h-[20px]"/>,
  },
  {
    id: '2',
    name: 'Details',
    icon: <FileIcon className="w-[20px] h-[20px]"/>,
  },
  {
    id: '3',
    name: 'Others',
    icon: <FileIcon className="w-[20px] h-[20px]"/>,
  },
  {
    id: '4',
    name: 'Ending',
    icon: <CheckIcon className="w-[20px] h-[20px]"/>,
  }
];

function FormBuilder() {
  const [pages, setPages] = useState<Page[]>(DEFAULT_PAGES);
  
  const [activePageId, setActivePageId] = useState<Page['id'] | null>(DEFAULT_PAGES[0].id);

  const onPageAdd = (pageIndex?: number) => {
    const pageName = `Page ${pages.length + 1}`; // Default name for new pages

    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID, will get it from backend later
      name: pageName,
      icon: <FileIcon className="w-[20px] h-[20px]"/> // Default icon for new pages
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

    setActivePageId(newPage.id);
  }

  const onPageDragEnd = (draggedPageId: Page['id'], overPageId: Page['id']) => {
    const activePageIndex = pages.findIndex(page => page.id === draggedPageId);
    const overPageIndex = pages.findIndex(page => page.id === overPageId);

    if (activePageIndex !== -1 && overPageIndex !== -1) {
      const updatedPages = [...pages];
      const [movedPage] = updatedPages.splice(activePageIndex, 1);
      updatedPages.splice(overPageIndex, 0, movedPage);
      setPages(updatedPages);
    }
  }

  const activePage = pages.find(page => page.id === activePageId);

  return (
    <main className="h-full w-full font-inter text-sm font-medium text-fillout-zinc-900">
      <div className="h-[calc(100vh-72px)]">
        <PageEditor page={activePage}/>
      </div>
      <nav className="h-[72px] flex align-center">
        <PageNav
          activePageId={activePageId}
          onNavItemClicked={setActivePageId}
          pages={pages}
          onPageAdd={onPageAdd}
          onPageDragEnd={onPageDragEnd}
        />
      </nav>
      
    </main>
  );
}

export default FormBuilder;