import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QIDropdown } from './index';

describe('QIDropdown', () => {
  const toggleText = 'Toggle Dropdown';
  const childrenText = 'Dropdown Content';
  
  const defaultProps = {
    toggleComponent: <button>{toggleText}</button>,
    children: <div>{childrenText}</div>,
  };

  test('renders the toggle component and shows/hides content on click', () => {
    render(<QIDropdown {...defaultProps} />);
    
    // Toggle should be visible, content hidden initially
    expect(screen.getByText(toggleText)).toBeInTheDocument();
    expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
    
    // Click toggle to show content
    fireEvent.click(screen.getByText(toggleText));
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    
    // Click toggle again to hide content
    fireEvent.click(screen.getByText(toggleText));
    expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
  });

  test('calls onHide callback when dropdown is closed', () => {
    const onHideMock = jest.fn();
    render(<QIDropdown {...defaultProps} onHide={onHideMock} />);
    
    // Show dropdown first
    fireEvent.click(screen.getByText(toggleText));
    
    // Hide dropdown by clicking toggle again
    fireEvent.click(screen.getByText(toggleText));
    
    // onHide should have been called
    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  test('hides dropdown when clicking outside', async () => {
    render(
      <div>
        <QIDropdown {...defaultProps} />
        <div data-testid="outside-element">Outside Element</div>
      </div>
    );
    
    // Show dropdown first
    fireEvent.click(screen.getByText(toggleText));
    expect(screen.getByText(childrenText)).toBeInTheDocument();
    
    // Click outside the dropdown
    fireEvent.mouseDown(screen.getByTestId('outside-element'));
    
    // Wait for the outside click handler
    await waitFor(() => {
      expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
    });
  });
});