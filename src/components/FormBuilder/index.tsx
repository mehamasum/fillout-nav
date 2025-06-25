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

  return (
    <div>
      <PageEditor currentPageId={currentPageId}/>
      <PageNav 
        currentPageId={currentPageId}
        onPageSelection={setCurrentPageId}
        pages={pages}  
      />
    </div>
  );
}

export default FormBuilder;