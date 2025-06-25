import type { Page } from '../FormBuilder';

interface PageEditorProps {
  currentPageId: Page['id'] | null;
}

function PageEditor({
  currentPageId
}: PageEditorProps) {
  return (
    <div>
      {currentPageId ? `Editing Page: ${currentPageId}` : 'No page selected'}
    </div>
  );
}

export default PageEditor;
