import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QISpinner } from './QISpinner';
import { loader } from '../../assets';

// Mock the loader asset
jest.mock('../../assets', () => ({
  loader: 'mocked-loader-path.gif'
}));

describe('QISpinner Component', () => {
  it('renders correctly with default props', () => {
    render(<QISpinner />);
    
    const spinnerElement = screen.getByAltText('Loading');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveAttribute('src', loader);
    expect(spinnerElement).toHaveClass('m-auto');
    expect(spinnerElement).toHaveAttribute('height', 'auto');
    expect(spinnerElement).toHaveAttribute('width', 'auto');
  });

  it('applies custom size when provided', () => {
    render(<QISpinner size="50px" />);
    
    const spinnerElement = screen.getByAltText('Loading');
    expect(spinnerElement).toHaveAttribute('height', '50px');
    expect(spinnerElement).toHaveAttribute('width', '50px');
  });
  
  it('renders with correct alt text', () => {
    render(<QISpinner data-testid="spinner-test" />);
    
    const spinnerElement = screen.getByAltText('Loading');
    expect(spinnerElement).toHaveAttribute('alt', 'Loading');
  });
});