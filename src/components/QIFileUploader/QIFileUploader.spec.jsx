import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QIFileUploader } from './QIFileUploader';

describe('QIFileUploader', () => {
  const defaultProps = {
    label: 'Upload File',
    onChange: jest.fn(),
    placeholder: 'Supported formats: PDF, DOC, DOCX',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with label and placeholder correctly', () => {
    const { container } = render(<QIFileUploader {...defaultProps} />);
    
    expect(screen.getByTestId('input-label')).toHaveTextContent('Upload File');
    expect(screen.getByText('Supported formats: PDF, DOC, DOCX')).toBeInTheDocument();
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  test('calls onChange handler when file is selected', () => {
    const { container } = render(<QIFileUploader {...defaultProps} />);
    
    const fileInput = container.querySelector('input[type="file"]');
    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    // Mock FileList object
    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    
    fireEvent.change(fileInput);
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith([file]);
  });

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'File size exceeds the limit';
    const { container } = render(<QIFileUploader {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(container.querySelector('.qi-input')).toHaveClass('error');
  });

  test('applies disabled styles when readOnly is true', () => {
    const { container } = render(<QIFileUploader {...defaultProps} readOnly={true} />);
    
    expect(container.querySelector('.qi-input')).toHaveClass('disabled');
  });
});