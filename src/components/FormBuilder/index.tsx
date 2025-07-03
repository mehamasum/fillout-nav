import { useState } from 'react';
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
  { id: '1', name: 'Info', icon: <InfoIcon className="w-[20px] h-[20px]" /> },
  { id: '2', name: 'Details', icon: <FileIcon className="w-[20px] h-[20px]" /> },
  { id: '3', name: 'Others', icon: <FileIcon className="w-[20px] h-[20px]" /> },
  { id: '4', name: 'Ending', icon: <CheckIcon className="w-[20px] h-[20px]" /> }
];

function FormBuilder() {
  const [pages, setPages] = useState<Page[]>(DEFAULT_PAGES);
  const [activePageId, setActivePageId] = useState<Page['id'] | null>(DEFAULT_PAGES[0].id);

  const handleAddPage = (pageIndex?: number) => {
    const pageName = `Page ${pages.length + 1}`;
    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 15),
      name: pageName,
      icon: <FileIcon className="w-[20px] h-[20px]" />
    };
    if (pageIndex === undefined) {
      setPages([...pages, newPage]);
    } else {
      const updatedPages = [...pages];
      updatedPages.splice(pageIndex, 0, newPage);
      setPages(updatedPages);
    }
    setActivePageId(newPage.id);
  };

  const handleReorderPages = (draggedPageId: Page['id'], overPageId: Page['id']) => {
    const fromIndex = pages.findIndex(page => page.id === draggedPageId);
    const toIndex = pages.findIndex(page => page.id === overPageId);
    if (fromIndex !== -1 && toIndex !== -1) {
      const updatedPages = [...pages];
      const [movedPage] = updatedPages.splice(fromIndex, 1);
      updatedPages.splice(toIndex, 0, movedPage);
      setPages(updatedPages);
    }
  };

  const activePage = pages.find(page => page.id === activePageId);

  return (
    <main className="h-full w-full font-inter text-sm font-medium text-fillout-zinc-900">
      <div className="h-[calc(100vh-72px)]">
        <PageEditor page={activePage} />
      </div>
      <nav className="h-[72px] flex align-center">
        <PageNav
          activePageId={activePageId}
          onActivePageChange={setActivePageId}
          pages={pages}
          onAddPage={handleAddPage}
          onReorderPages={handleReorderPages}
        />
      </nav>
    </main>
  );
}

export default FormBuilder;