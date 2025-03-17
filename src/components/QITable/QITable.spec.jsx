import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QITable } from './index';
import { QICheckBox } from '../QICheckBox'; 
import '@testing-library/jest-dom';

// Mock the QICheckBox component since it's causing issues
jest.mock('../QICheckBox', () => ({
  QICheckBox: ({ checked, changeHandler }) => (
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={changeHandler || (() => {})}
      data-testid="checkbox"
    />
  )
}));

describe('QITable Component', () => {
  const mockHeaders = [
    { checkbox: true, statusKey: 'id' },
    { label: 'Name', key: 'name', sortable: true, defaultSort: true },
    { label: 'Email', key: 'email' },
    { label: 'Age', key: 'age', sortable: true }
  ];

  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 }
  ];

  const mockHandler = {
    allSelectHandler: jest.fn(),
    checkboxHandler: jest.fn(),
    rowHandler: jest.fn(),
    sortingHandler: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders table with correct headers and data', () => {
    render(<QITable headers={mockHeaders} data={mockData} handler={mockHandler} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    
    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('calls rowHandler when a row is clicked', () => {
    render(<QITable headers={mockHeaders} data={mockData} handler={mockHandler} />);
    
    const rows = screen.getAllByTestId('tr');
    fireEvent.click(rows[0]);
    
    expect(mockHandler.rowHandler).toHaveBeenCalledWith(mockData[0]);
  });

  test('calls sortingHandler when a sortable header is clicked', () => {
    // The component appears to initialize with 'desc' sorting for the first click
    // so we need to account for that in our test
    render(<QITable headers={mockHeaders} data={mockData} handler={mockHandler} />);
    
    const sortableHeaders = screen.getAllByTestId('sort');
    fireEvent.click(sortableHeaders[1]); // Name header
    
    // First click should set it to desc 
    expect(mockHandler.sortingHandler).toHaveBeenCalledWith('name', 'desc');
    
    // Second click should set it to asc
    fireEvent.click(sortableHeaders[1]);
    expect(mockHandler.sortingHandler).toHaveBeenCalledWith('name', 'asc');
  });

  test('handles checkbox selection', () => {
    // Mock the status array to avoid checkbox state issues
    const mockStatus = [2]; // Marking the second item as selected
    
    render(
      <QITable 
        headers={mockHeaders} 
        data={mockData} 
        handler={mockHandler} 
        status={mockStatus}
      />
    );
    
    const checkboxes = screen.getAllByTestId('checkbox');
    
    // Test individual row selection
    fireEvent.click(checkboxes[1]); // First row checkbox
    expect(mockHandler.checkboxHandler).toHaveBeenCalledWith(mockData[0]);
    
    // Test select all
    fireEvent.click(checkboxes[0]); // Header checkbox
    expect(mockHandler.allSelectHandler).toHaveBeenCalled();
  });

  test('handles custom components in table cells', () => {
    const MockComponent = ({ data }) => <button>Action {data.id}</button>;
    
    const headersWithComponent = [
      ...mockHeaders,
      { label: 'Action', type: 'component', component: MockComponent }
    ];
    
    render(<QITable headers={headersWithComponent} data={mockData} handler={mockHandler} />);
    
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
});