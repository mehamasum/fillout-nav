import type { Page } from '../FormBuilder';

interface PageEditorProps {
  currentPageId: Page['id'] | null;
}

function PageEditor({
  currentPageId
}: PageEditorProps) {
  return (
    <div className="h-full p-4 bg-gray-100">
      <p className="text-md text-gray-600 bg-white p-4 rounded" data-testid="page-editor-info">
        {currentPageId ? `Editing Page: ${currentPageId}` : 'No page selected'}
      </p>
    </div>
  );
}

export default PageEditor;
