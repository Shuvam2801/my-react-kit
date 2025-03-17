import React from 'react';
import { render, screen } from '@testing-library/react';
import QIButton from './QIButton';

test('renders QIButton with label', () => {
    render(<QIButton label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
}); 