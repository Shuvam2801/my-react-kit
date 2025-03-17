import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { QIPagination } from './index';
import { SvgIcon } from '../Shared/SvgIcon';

// Mock the SvgIcon component to include more specific data-testids
jest.mock('../Shared/SvgIcon', () => ({
  SvgIcon: ({ name, wrapperClass, svgClass }) => (
    <div data-testid={`svg-icon-${name}-${wrapperClass}`} className={`${wrapperClass} ${svgClass}`}>
      {name}
    </div>
  ),
}));

describe('QIPagination Component', () => {
  const defaultProps = {
    pageCount: 10,
    activePage: 3,
    onPageChange: jest.fn(),
    setDockAlign: jest.fn(),
    setShowDetails: jest.fn(),
    removeLayerOnClose: jest.fn(),
    setDeviceId: jest.fn(),
    setHighlight: jest.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(<QIPagination {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the pagination component with correct structure', () => {
    renderComponent();
    // Check that numbered pages are present
    expect(screen.getByText('3')).toBeInTheDocument(); // Active page
    // Check navigation buttons
    expect(screen.getByTestId('svg-icon-up-arrow-double-first')).toBeInTheDocument(); // first button
    expect(screen.getByTestId('svg-icon-up-arrow-previous')).toBeInTheDocument(); // previous button
  });

  test('indicates the active page correctly', () => {
    renderComponent();
    const activePage = screen.getByText('3').closest('li');
    expect(activePage).toHaveClass('active');
  });

  test('calls onPageChange with correct page when a page is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('4'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  test('does not call onPageChange when the active page is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('3')); // Active page
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  test('calls side effects when changing page', () => {
    renderComponent();
    fireEvent.click(screen.getByText('4'));
    expect(defaultProps.setShowDetails).toHaveBeenCalledWith(false);
    expect(defaultProps.setDockAlign).toHaveBeenCalledWith('cross');
    expect(defaultProps.removeLayerOnClose).toHaveBeenCalled();
    expect(defaultProps.setDeviceId).toHaveBeenCalledWith(null);
    expect(defaultProps.setHighlight).toHaveBeenCalledWith(null);
  });

  test('disables first/previous buttons when on first page', () => {
    renderComponent({ activePage: 1 });
    const firstButton = screen.getByTestId('svg-icon-up-arrow-double-first').closest('li');
    expect(firstButton).toHaveClass('disabled');
  });

  test('disables next/last buttons when on last page', () => {
    renderComponent({ activePage: 10, pageCount: 10 });
    const lastButton = screen.getByTestId('svg-icon-up-arrow-double-last').closest('li');
    expect(lastButton).toHaveClass('disabled');
  });

  test('handles small page counts correctly', () => {
    renderComponent({ pageCount: 3, activePage: 2 });
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    // Should not have ellipsis
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });
});