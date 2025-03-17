import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QICheckBox } from './QICheckBox'; // Adjust the import path as needed

describe('QICheckBox Component', () => {
  // Test 1: Basic rendering with label
  test('renders with label', () => {
    render(<QICheckBox label="Test Label" />);
    const label = screen.getByText('Test Label');
    const checkbox = screen.getByRole('checkbox');
    expect(label).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });

  // Test 2: Checked state functionality
  test('handles checked state and onChange', () => {
    const mockOnChange = jest.fn();
    render(<QICheckBox checked={true} onChange={mockOnChange} value="test-value" />);
    const checkbox = screen.getByRole('checkbox');
    
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith('test-value');
  });

  // Test 3: Disabled state
  test('is disabled when readOnly is true', () => {
    render(<QICheckBox readOnly={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  // Test 4: Error message
  test('shows error when not readOnly', () => {
    render(<QICheckBox error="Error message" readOnly={false} />);
    const error = screen.getByText('Error message');
    expect(error).toBeInTheDocument();
  });
});