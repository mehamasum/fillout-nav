import type { Page } from '../FormBuilder';

interface PageEditorProps {
  page?: Page;
}

function PageEditor({ page }: PageEditorProps) {
  return (
    <section className="h-full p-4 bg-gray-100">
      <p className="text-md text-gray-600 bg-white p-4 rounded" data-testid="page-editor-info">
        {page ? `Editing Page: ${page.name}` : 'No page selected'}
      </p>
    </section>
  );
}

export default PageEditor;
