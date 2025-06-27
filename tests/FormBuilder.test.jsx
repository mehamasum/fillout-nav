import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import FormBuilder from '../src/components/FormBuilder';


describe('FormBuilder', () => {
  describe('Highlighting active page', () => {
    it('Highlights the first page in editing mode', () => {
      render(<FormBuilder />);
      const navItems = screen.getAllByTestId('page-nav-item');

      expect(navItems[0]).toHaveTextContent('Info'); // First page should be 'Info'
      expect(navItems[0]).toHaveClass('bg-white'); // First page should be active by default
      expect(screen.getByTestId('page-editor-info')).toHaveTextContent('Editing Page: Info');
    });

    it('Highlights the current page in editing mode', async () => {
      render(<FormBuilder />);
      const navItems = screen.getAllByTestId('page-nav-item');

      expect(navItems[1]).toHaveTextContent('Details'); // Second page should be 'Details'
      act(() => {
        navItems[1].click(); // Simulate clicking the second page
      });

      await waitFor(() => {
        expect(screen.getByTestId('page-editor-info')).toHaveTextContent('Editing Page: Details');
      });

      expect(navItems[0]).not.toHaveClass('bg-white'); // First page should no longer be active
      expect(navItems[1]).toHaveClass('bg-white'); // Second page should now be active
    });
  });


  describe('Adding new pages', () => {
    it('Adds a new page at the end', async () => {
      render(<FormBuilder />);

      let navItems = screen.getAllByTestId('page-nav-item');
      expect(navItems).toHaveLength(4); // 4 initial pages


      const addPageButton = screen.getByTestId('add-page-button').firstChild;
      expect(addPageButton).toBeInTheDocument();

      act(() => {
        addPageButton.click(); // Simulate clicking the "Add Page" button
      });

      await screen.findByText('Page 5'); // Wait for the new page to be added

      navItems = screen.getAllByTestId('page-nav-item');
      expect(navItems).toHaveLength(5); // 4 initial pages + 1 new page
      expect(navItems[4]).toHaveTextContent('Page 5'); // New page should be added at the end
    });

    it('Adds a new page in between two pages', async () => {
      const delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      render(<FormBuilder />);

      let navItems = screen.getAllByTestId('page-nav-item');
      expect(navItems).toHaveLength(4); // 4 initial pages
      expect(navItems[0]).toHaveTextContent('Info');
      expect(navItems[1]).toHaveTextContent('Details');

      const user = userEvent.setup();
      const hoverTarget = screen.getByTestId('page-separator-0'); // Hover over the separator between first and second pages
      
      await act(async () => {
        await user.hover(hoverTarget);
        await delay(300); // Wait for the hover effect to take place  
      });

      const addPageButton = screen.getByTestId('add-page-button-0');
      expect(addPageButton).toBeInTheDocument();
      act(() => {
        addPageButton.click(); // Simulate clicking the "Add Page" button
      });

      await screen.findByText('Page 5'); // Wait for the new page to be added

      navItems = screen.getAllByTestId('page-nav-item');
      expect(navItems).toHaveLength(5); // 4 initial pages + 1 new page

      expect(navItems[0]).toHaveTextContent('Info'); // First page should still be 'Info'
      expect(navItems[1]).toHaveTextContent('Page 5'); // New page should be added in between
      expect(navItems[2]).toHaveTextContent('Details'); // Second page should now be 'Details'
    });
  });

  it('Renders the context menu', async () => {
    render(<FormBuilder />);

    let navItems = screen.getAllByTestId('page-nav-item');
    act(() => {
      navItems[1].click(); // Simulate clicking the second page
    });

    await waitFor(() => {
      expect(screen.getByTestId('page-editor-info')).toHaveTextContent('Editing Page: Details');
    });

    // click on the context menu button
    const contextMenuButton = navItems[1].querySelector('.context-menu-trigger');
    expect(contextMenuButton).toBeInTheDocument();
    act(() => {
      contextMenuButton.click(); // Simulate clicking the context menu button
    });

    await waitFor(() => {
      expect(screen.getByTestId("context-menu")).toBeInTheDocument();
    });

    const contextMenuItems = screen.getByTestId("context-menu-items");
    expect(contextMenuItems).toBeInTheDocument();
    expect(contextMenuItems).toHaveTextContent('Set as first page');
    expect(contextMenuItems).toHaveTextContent('Rename');
    expect(contextMenuItems).toHaveTextContent('Copy');
    expect(contextMenuItems).toHaveTextContent('Duplicate');
    expect(contextMenuItems).toHaveTextContent('Delete');
  });
});