import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QISwitch } from './index';
import sprite from '../../assets/icons.svg';

// Mock the sprite asset
jest.mock('../../assets/icons.svg', () => 'mocked-sprite.svg');

describe('QISwitch Component', () => {
  const defaultProps = {
    label: 'Test Switch',
    value: false,
    onChange: jest.fn(),
  };

  it('renders correctly with default props', () => {
    render(<QISwitch {...defaultProps} />);
    
    // Check label
    expect(screen.getByTestId('input-label')).toHaveTextContent('Test Switch');
    
    // Check checkbox is unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    // Check switch container exists
    const switchContainer = screen.getByTestId('input-label').closest('.qi-form-element');
    expect(switchContainer).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const { container } = render(<QISwitch {...defaultProps} />);
    
    // Using container.querySelector since the slider doesn't have a text or testid
    const slider = container.querySelector('.slider');
    fireEvent.click(slider);
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('displays the checked state correctly', () => {
    render(<QISwitch {...defaultProps} value={true} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('does not call onChange when readonly', () => {
    const { container } = render(<QISwitch {...defaultProps} readOnly={true} />);
    
    const slider = container.querySelector('.slider');
    fireEvent.click(slider);
    
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    render(<QISwitch {...defaultProps} error="This is an error" />);
    
    // Check for error message
    const errorMessage = screen.getByText('This is an error');
    expect(errorMessage).toBeInTheDocument();
    
    // Check that error class is applied
    const formElement = screen.getByTestId('input-label').closest('.qi-form-element');
    expect(formElement).toHaveClass('error');
  });

  it('applies disabled state correctly', () => {
    render(<QISwitch {...defaultProps} disabled={true} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    
    const formElement = screen.getByTestId('input-label').closest('.qi-form-element');
    expect(formElement).toHaveClass('disabled');
  });

  it('displays warning message when provided', () => {
    render(<QISwitch {...defaultProps} warningMessage="This is a warning" />);
    
    const warningMessage = screen.getByText('This is a warning');
    expect(warningMessage).toBeInTheDocument();
  });
});