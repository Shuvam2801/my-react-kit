import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QIModal, QIModalHeader, QIModalBody, QIModalFooter } from './QIModal';

// Mock the ReactDOM.createPortal
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element) => element,
}));

// Mock the sprite import
jest.mock('../../assets/icons.svg', () => 'mocked-icon-path');

describe('QIModal Components', () => {
  const defaultProps = {
    show: true,
    onHide: jest.fn(),
    children: <div>Modal Content</div>
  };

  const headerDefaultProps = {
    onHide: jest.fn(),
    children: 'Header Title'
  };

  beforeEach(() => {
    // Create root element for portal
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    
    // Reset mock functions
    defaultProps.onHide.mockClear();
    headerDefaultProps.onHide.mockClear();
  });

  afterEach(() => {
    const root = document.getElementById('root');
    if (root) document.body.removeChild(root);
  });

  // Essential QIModal tests
  test('should not render when show is false', () => {
    render(<QIModal {...defaultProps} show={false} />);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('should render when show is true', () => {
    render(<QIModal {...defaultProps} />);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('should call onHide when backdrop is clicked', () => {
    render(<QIModal {...defaultProps} backdrop={true} />);
    
    const modal = screen.getByText('Modal Content').closest('.qi-modal');
    fireEvent.click(modal);
    expect(defaultProps.onHide).toHaveBeenCalledTimes(1);
  });

  test('should not call onHide when backdrop click is disabled', () => {
    render(<QIModal {...defaultProps} backdrop={false} />);
    
    const modal = screen.getByText('Modal Content').closest('.qi-modal');
    fireEvent.click(modal);
    expect(defaultProps.onHide).not.toHaveBeenCalled();
  });

  // Essential QIModalHeader test
  test('should render header with close button and call onHide when clicked', () => {
    render(<QIModalHeader {...headerDefaultProps} />);
    
    expect(screen.getByText('Header Title')).toBeInTheDocument();
    const closeButton = document.querySelector('.qi-modal_close');
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(headerDefaultProps.onHide).toHaveBeenCalledTimes(1);
  });

  // Main integration test
  test('should render a complete modal with all subcomponents', () => {
    const handleHide = jest.fn();
    
    render(
      <QIModal show={true} onHide={handleHide}>
        <QIModalHeader onHide={handleHide}>Modal Title</QIModalHeader>
        <QIModalBody>Modal Body Content</QIModalBody>
        <QIModalFooter>
          <button>Submit</button>
        </QIModalFooter>
      </QIModal>
    );
    
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Body Content')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    
    // Test closing the modal via header close button
    const closeButton = document.querySelector('.qi-modal_close');
    fireEvent.click(closeButton);
    expect(handleHide).toHaveBeenCalledTimes(1);
  });
});