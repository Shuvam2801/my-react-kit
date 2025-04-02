import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QIList } from './QIList';

describe('QIList Component', () => {
  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' }
  ];

  const data = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' }
  ];

  const mockHandler = {
    rowHandler: jest.fn(),
    checkboxHandler: jest.fn(),
    allSelectHandler: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders column headers correctly', () => {
    render(<QIList columns={columns} data={data} handler={mockHandler} />);
    
    columns.forEach(column => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });
  });

  test('renders data rows correctly', () => {
    render(<QIList columns={columns} data={data} handler={mockHandler} />);
    
    data.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
      expect(screen.getByText(item.role)).toBeInTheDocument();
    });
  });

  test('displays "No data available" when data array is empty', () => {
    render(<QIList columns={columns} data={[]} handler={mockHandler} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('calls rowHandler when row is clicked', () => {
    render(<QIList columns={columns} data={data} handler={mockHandler} />);
    
    const firstRow = screen.getByText('John Doe').closest('.qi-list_list_item');
    fireEvent.click(firstRow);
    
    expect(mockHandler.rowHandler).toHaveBeenCalledWith(expect.objectContaining(data[0]));
  });

  test('hides header when listHeaderOptions is set to "hidden"', () => {
    render(
      <QIList 
        columns={columns} 
        data={data} 
        handler={mockHandler} 
        listHeaderOptions="hidden" 
      />
    );
    
    columns.forEach(column => {
      expect(screen.queryByText(column.label)).not.toBeInTheDocument();
    });
  });

  test('renders checkboxes correctly', () => {
    const columnsWithCheckbox = [
      { label: '', key: 'checkbox', checkbox: true, statusKey: 'id' },
      ...columns
    ];
    
    render(
      <QIList 
        columns={columnsWithCheckbox} 
        data={data} 
        handler={mockHandler} 
        status={['1']} 
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3); // 2 rows + 1 header checkbox
    
    // First row checkbox should be checked (status includes '1')
    expect(checkboxes[1]).toBeChecked();
    
    // Second row checkbox should not be checked
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('calls checkboxHandler when checkbox is clicked', () => {
    const columnsWithCheckbox = [
      { label: '', key: 'checkbox', checkbox: true, statusKey: 'id' },
      ...columns
    ];
    
    render(
      <QIList 
        columns={columnsWithCheckbox} 
        data={data} 
        handler={mockHandler} 
        status={[]} 
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Click first row checkbox
    
    expect(mockHandler.checkboxHandler).toHaveBeenCalledWith(expect.objectContaining(data[0]));
  });

  test('calls allSelectHandler when header checkbox is clicked', () => {
    const columnsWithCheckbox = [
      { label: '', key: 'checkbox', checkbox: true, statusKey: 'id' },
      ...columns
    ];
    
    render(
      <QIList 
        columns={columnsWithCheckbox} 
        data={data} 
        handler={mockHandler} 
        status={[]} 
      />
    );
    
    const headerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(headerCheckbox);
    
    expect(mockHandler.allSelectHandler).toHaveBeenCalled();
  });

  test('applies "striped" class to alternate rows when striped prop is true', () => {
    render(<QIList columns={columns} data={data} handler={mockHandler} striped={true} />);
    
    const rows = screen.getAllByTestId('list-row');
    expect(rows[1]).toHaveClass('striped');
  });

  test('highlights the selected row when highlight prop matches row id', () => {
    render(
      <QIList 
        columns={columns} 
        data={data} 
        handler={mockHandler} 
        highlight="2" 
      />
    );
    
    const secondRow = screen.getByText('Jane Smith').closest('.qi-list_list_item');
    expect(secondRow).toHaveClass('selected');
  });

  test('renders custom component', () => {
    const StatusComponent = ({ data }) => <div data-testid="status-component">{data.role}</div>;
    
    const columnsWithComponent = [
      ...columns,
      { label: 'Status', key: 'status', type: 'component', component: StatusComponent }
    ];
    
    render(<QIList columns={columnsWithComponent} data={data} handler={mockHandler} />);
    
    expect(screen.getAllByTestId('status-component')).toHaveLength(2);
  });

  test('renders detailed view when detailedView and detailedData are provided', () => {
    const detailedData = (item) => (
      <div data-testid="detailed-view">Details for {item.name}</div>
    );
    
    render(
      <QIList 
        columns={columns} 
        data={data} 
        handler={mockHandler} 
        detailedView={true}
        detailedData={detailedData}
      />
    );
    
    expect(screen.getByText('Details for John Doe')).toBeInTheDocument();
    expect(screen.getByText('Details for Jane Smith')).toBeInTheDocument();
  });

  test('displays nested values correctly', () => {
    const columnsWithNested = [
      { 
        label: 'Full Info', 
        key: 'fullInfo', 
        nestedValue: true, 
        getNestedValue: (item) => `${item.name} - ${item.role}`
      }
    ];
    
    render(<QIList columns={columnsWithNested} data={data} handler={mockHandler} />);
    
    expect(screen.getByText('John Doe - Admin')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith - User')).toBeInTheDocument();
  });

  test('sets correct maxHeight style on list body', () => {
    render(
      <QIList 
        columns={columns} 
        data={data} 
        handler={mockHandler} 
        scrollbarHeight="200px"
      />
    );
    
    const listBody = screen.getByRole('list').parentElement;
    expect(listBody).toHaveStyle({ maxHeight: '200px' });
  });
});