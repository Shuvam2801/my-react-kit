import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QIMultiSelectDropDown } from './index';

// Mock the dependencies
jest.mock('react-custom-scrollbars', () => ({
  Scrollbars: function MockScrollbars(props) {
    return <div data-testid="scrollbars">{props.children}</div>;
  }
}));

jest.mock('../../assets/icons.svg', () => 'mock-sprite-path');

// Mock QIDropdown properly - avoiding out-of-scope variables
jest.mock('../QIDropdown', () => {
  // Using a named function to avoid issues with arrow functions
  return {
    QIDropdown: function MockQIDropdown(props) {
      // No state here - we'll control visibility through test interactions
      return (
        <div data-testid="qi-dropdown" className="qi-dropdown">
          <div 
            data-testid="toggle-component" 
            className="qi-dropdown_toggle"
          >
            {props.toggleComponent}
          </div>
          {/* Always render children but control visibility in test */}
          <div data-testid="dropdown-content" className="qi-dropdown_menu">
            {props.children}
          </div>
        </div>
      );
    }
  };
});

jest.mock('../QIInput', () => ({
  QIInput: function MockQIInput(props) {
    return (
      <input
        data-testid="qi-input"
        value={props.value || ''}
        placeholder={props.placeholder || ''}
        onChange={props.onChange || (() => {})}
      />
    );
  }
}));

describe('QIMultiSelectDropDown Component', () => {
  const mockData = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
  ];

  const mockAllData = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
    { id: '4', name: 'Option 4' },
  ];

  const mockSelected = ['1', '2'];

  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with selected items as chips', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByTestId('input-label')).toHaveTextContent('Test Dropdown');
    
    // Should have chips for Option 1 and Option 2
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles item selection correctly', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
      />
    );
    
    // Click the add new button to open dropdown
    const addNewButton = screen.getByTitle('Add New');
    fireEvent.click(addNewButton);
    
    // Find and click on Option 3
    const option3 = screen.getByText('Option 3');
    fireEvent.click(option3);
    
    // onChange should be called with all three options
    expect(mockOnChange).toHaveBeenCalledWith(['1', '2', '3']);
  });

  it('handles chip deletion confirmation correctly', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
      />
    );
    
    // Find and click the cross icon of first chip (Option 1)
    const crossIcons = screen.getAllByRole('button', { name: /remove/i }) || 
                      screen.getAllByTitle(/remove/i) ||
                      screen.getAllByTestId('chip-cross');
    
    fireEvent.click(crossIcons[0]);
    
    // Yes button should be visible now
    const yesButton = screen.getByText('Yes');
    
    // Click Yes to confirm deletion
    fireEvent.click(yesButton);
    
    // onChange should have been called with only Option 2 selected
    expect(mockOnChange).toHaveBeenCalledWith(['2']);
  });

  it('does not render chips when multiSelectWithoutChip is true', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
        multiSelectWithoutChip={true}
      />
    );
    
    // Should not render any chips
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
        error="This is an error message"
      />
    );
    
    const errorMessage = screen.getByText('This is an error message');
    expect(errorMessage).toBeInTheDocument();
    
    // Component should have error class
    const wrapper = screen.getByTestId('input-label').closest('.qi-multiselect-dropdown');
    expect(wrapper).toHaveClass('error');
  });

  it('applies readOnly state correctly', () => {
    render(
      <QIMultiSelectDropDown
        label="Test Dropdown"
        data={mockData}
        allData={mockAllData}
        selected={mockSelected}
        onChange={mockOnChange}
        readOnly={true}
      />
    );
    
    // Wrapper should have disabled class
    const wrapper = screen.getByTestId('input-label').closest('.qi-multiselect-dropdown');
    expect(wrapper).toHaveClass('disabled');
    
    // Add New button should not be rendered in read-only mode
    const addNewButton = screen.queryByTitle('Add New');
    expect(addNewButton).not.toBeInTheDocument();
  });
});