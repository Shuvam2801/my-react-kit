import React from 'react';
import { render, screen } from '@testing-library/react';
import QIInput from './QIInput';

test('renders QIInput with label', () => {
    render(<QIInput label="Test Input" value="" onChange={() => {}} />);
    const labelElement = screen.getByText(/Test Input/i);
    expect(labelElement).toBeInTheDocument();
}); 