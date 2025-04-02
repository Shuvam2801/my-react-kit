
import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QIInput } from './QIInput';

describe('QIInput', () => {
  let user;
  
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input element', () => {
    render(<QIInput />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('allows users to enter text', async () => {
    const Wrapper = () => {
      const [testValue, setTestValue] = useState('');
      return <QIInput value={testValue} onChange={setTestValue} />;
    };

    render(<Wrapper />);
    
    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, 'Hello World');

    expect(inputElement).toHaveValue('Hello World');
  });
  it('validates email input correctly', async () => {
    const Wrapper = () => {
      const [testValue, setTestValue] = useState('');
      return <QIInput type="email" value={testValue} onChange={setTestValue} />;
    };

    render(<Wrapper />);
    
    const inputElement = screen.getByRole('textbox');

    await user.type(inputElement, 'test@example.com');
    expect(inputElement).toHaveValue('test@example.com'); // Now works correctly!

    await user.clear(inputElement);
    await user.type(inputElement, 'invalidemail');
    await inputElement.blur(); // Simulate user clicking outside the field

    expect(screen.getByText('Invalid email address')).toBeInTheDocument(); // Error should be displayed
    expect(inputElement).toHaveValue('invalidemail'); 
  });

  it('shows error message for non-numeric values when type is number', async () => {
    const Wrapper = () => {
      const [testValue, setTestValue] = useState('');
      return <QIInput type="number" value={testValue} onChange={setTestValue} />;
    };
  
    render(<Wrapper />);
    
    const inputElement = screen.getByRole('textbox'); 
  
    // Type valid numbers
    await user.type(inputElement, '-123.45');
    expect(inputElement).toHaveValue('-123.45'); 
  
    // Type invalid characters
    await user.clear(inputElement);
    await user.type(inputElement, 'abc');
    await inputElement.blur(); // Simulate user clicking outside the field

    expect(screen.getByText('Only numeric values are allowed')).toBeInTheDocument(); // Error should be displayed
    expect(inputElement).toHaveValue('abc');
  });
  
});
