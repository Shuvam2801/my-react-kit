import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QIButton } from './QIButton';

describe('QIButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders button with text children', () => {
    render(<QIButton>Click Me</QIButton>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('applies the correct CSS classes', () => {
    render(<QIButton className="custom-class">Button</QIButton>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveClass('qi-btn');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('applies disabled state correctly', () => {
    render(<QIButton disabled>Disabled Button</QIButton>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled');
  });

  it('applies the correct button type', () => {
    render(<QIButton type="submit">Submit</QIButton>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('defaults to button type when not specified', () => {
    render(<QIButton>Default Button</QIButton>);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<QIButton onClick={handleClick}>Clickable Button</QIButton>);
    const buttonElement = screen.getByTestId('button');
    
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders an SVG icon when src is a string', () => {
    const iconSrc = '#path/to/icon';
    render(
      <QIButton icon={{ src: iconSrc, className: 'test-icon-class', wrapperClass: 'test-wrapper-class' }}>
        Button with Icon
      </QIButton>
    );
    
    const buttonElement = screen.getByTestId('button');
    const svgElement = buttonElement.querySelector('svg');
    const useElement = buttonElement.querySelector('use');
    const wrapperElement = buttonElement.querySelector('.icon-wrapper');
    
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveClass('icon');
    expect(svgElement).toHaveClass('test-icon-class');
    expect(useElement).toHaveAttribute('href', iconSrc);
    expect(wrapperElement).toHaveClass('test-wrapper-class');
  });

  it('renders a React element when src is not a string', () => {
    const iconElement = <span data-testid="custom-icon">Custom Icon</span>;
    render(
      <QIButton icon={{ src: iconElement }}>
        Button with Custom Icon
      </QIButton>
    );
    
    const customIcon = screen.getByTestId('custom-icon');
    expect(customIcon).toBeInTheDocument();
    expect(customIcon).toHaveTextContent('Custom Icon');
  });

  it('does not render an icon when src is not provided', () => {
    render(<QIButton icon={{}}>Button without Icon</QIButton>);
    
    const buttonElement = screen.getByTestId('button');
    const svgElement = buttonElement.querySelector('svg');
    const useElement = buttonElement.querySelector('use');
    
    expect(svgElement).not.toBeInTheDocument();
    expect(useElement).not.toBeInTheDocument();
  });

  it('wraps children in a label span', () => {
    render(<QIButton>Label Text</QIButton>);
    
    const labelSpan = screen.getByText('Label Text');
    expect(labelSpan).toHaveClass('qi-btn_label');
  });

  it('handles complex children', () => {
    render(
      <QIButton>
        <span data-testid="complex-child">Complex</span> Child
      </QIButton>
    );
    const complexChild = screen.getByTestId('complex-child');
    expect(complexChild).toBeInTheDocument();
    
    // Use a custom matcher function instead of exact text match
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement).toHaveTextContent(/Complex Child/);
  });
});