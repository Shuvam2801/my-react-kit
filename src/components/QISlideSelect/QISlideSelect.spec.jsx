import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QISlideSelect } from './QISlideSelect';

describe('QISlideSelect Component', () => {
  // Mock pagination object
  const mockPagination = {
    perPage: 20,
    onPerPageChange: jest.fn(),
    onPageChange: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct initial value', () => {
    render(<QISlideSelect pagination={mockPagination} />);
    
    // Check if the component displays the current perPage value
    expect(screen.getByText('20')).toBeInTheDocument();
    
    // Previous button should not be visible at default value
    const slideDisplay = screen.getByText('20');
    expect(slideDisplay.previousElementSibling).not.toBeInTheDocument();
    
    // Next button should be visible
    expect(slideDisplay.nextElementSibling).toBeInTheDocument();
  });

  it('increases value when clicking next button', () => {
    render(<QISlideSelect pagination={mockPagination} defaultVal={20} range={20} />);
    
    // Find and click the next button
    const nextButton = screen.getByText('20').nextElementSibling;
    fireEvent.click(nextButton);
    
    // Check if the pagination functions were called with correct values
    expect(mockPagination.onPerPageChange).toHaveBeenCalledWith(40);
    expect(mockPagination.onPageChange).toHaveBeenCalledWith(1);
  });

  it('decreases value when clicking previous button', () => {
    const customPagination = {
      ...mockPagination,
      perPage: 40
    };
    
    render(<QISlideSelect pagination={customPagination} defaultVal={20} range={20} />);
    
    // Find and click the previous button
    const prevButton = screen.getByText('40').previousElementSibling;
    fireEvent.click(prevButton);
    
    // Check if the pagination functions were called with correct values
    expect(mockPagination.onPerPageChange).toHaveBeenCalledWith(20);
    expect(mockPagination.onPageChange).toHaveBeenCalledWith(1);
  });

  it('does not show previous button when at default value', () => {
    render(<QISlideSelect pagination={mockPagination} defaultVal={20} />);
    
    // Check if the previous button is not rendered
    const slideDisplay = screen.getByText('20');
    expect(slideDisplay.previousElementSibling).not.toBeInTheDocument();
  });

  it('does not show next button when at max cap', () => {
    const maxCapPagination = {
      ...mockPagination,
      perPage: 100
    };
    
    render(<QISlideSelect pagination={maxCapPagination} maxCap={100} />);
    
    // Check if the next button is not rendered
    const slideDisplay = screen.getByText('100');
    expect(slideDisplay.nextElementSibling).not.toBeInTheDocument();
  });
});
