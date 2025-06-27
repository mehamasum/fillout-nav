import { render, screen } from '@testing-library/react'
import App from '../src/App';
import { expect } from 'vitest';

describe('App', () => {
  it('Renders correct page in editing mode by default', () => {
    render(<App />);
    
    expect(screen.getByTestId('page-editor-info')).toHaveTextContent('Editing Page: Info');
  });


  it('Renders correct pages in nav by default', () => {
    render(<App />);
    
    const navItems = screen.getAllByTestId('page-nav-item');
    expect(navItems).toHaveLength(4);
    expect(navItems[0]).toHaveTextContent('Info');
    expect(navItems[1]).toHaveTextContent('Details');
    expect(navItems[2]).toHaveTextContent('Others');
    expect(navItems[3]).toHaveTextContent('Ending');
  });

  it('Renders a button to add new page', () => {
    render(<App />);

    expect(screen.getByTestId("add-page-button")).toHaveTextContent('Add Page');
  });
});