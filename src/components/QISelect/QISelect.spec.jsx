import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QISelect } from './QISelect'; // Adjust the import path as needed

describe('QISelect Component', () => {
  const mockOptions = [
    <option key="1" value="option1">Option 1</option>,
    <option key="2" value="option2">Option 2</option>,
  ];

  // Test 1: Basic rendering
  test('renders with label and options', () => {
    render(<QISelect label="Select:" children={mockOptions} />);
    const label = screen.getByText('Select:');
    const select = screen.getByRole('combobox');
    expect(label).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  // Test 2: Selected value
  test('renders with correct selected value', () => {
    render(<QISelect value="option2" children={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  // Test 3: onChange handler
  test('calls onChange when selection changes', () => {
    const mockOnChange = jest.fn();
    render(<QISelect onChange={mockOnChange} children={mockOptions} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  // Test 4: ReadOnly state
  test('is readonly when readOnly is true', () => {
    render(<QISelect readOnly={true} children={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('qi-select_text_readonly');
    expect(select).toHaveAttribute('readonly');
  });

  // Test 5: Error message
  test('shows error when not readOnly', () => {
    render(<QISelect error="Required" readOnly={false} children={mockOptions} />);
    const error = screen.getByText('Required');
    expect(error).toBeInTheDocument();
  });
});