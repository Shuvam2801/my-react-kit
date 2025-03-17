import React from 'react';
import { render, screen } from '@testing-library/react';
import QIRadioButton from './QIRadioButton';

test('renders QIRadioButton with radio options', () => {
    const radioObjects = [
        { value: 'option1', label: 'Option 1', onChange: jest.fn(), checked: false },
        { value: 'option2', label: 'Option 2', onChange: jest.fn(), checked: false },
    ];
    
    render(<QIRadioButton radioObjects={radioObjects} />);
    
    const option1Label = screen.getByLabelText(/Option 1/i);
    const option2Label = screen.getByLabelText(/Option 2/i);
    
    expect(option1Label).toBeInTheDocument();
    expect(option2Label).toBeInTheDocument();
}); 