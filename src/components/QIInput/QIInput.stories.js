import React from 'react';
import { QIInput } from './QIInput';
import sprite from '../../assets/icons.svg';

export default {
  title: 'Components/QIInput',
  component: QIInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'number'],
      description: 'The type of input field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    iconAlign: {
      control: { type: 'radio' },
      options: ['left', 'right'],
      description: 'Alignment of the icon',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    value: {
      control: 'text',
      description: 'The value of the input',
    },
    focus: {
      control: 'boolean',
      description: 'Whether the input should be auto-focused',
    },
  },
};

// Base template for stories
const Template = (args) => {
  const [value, setValue] = React.useState(args.value || '');
  return <QIInput {...args} value={value} onChange={setValue} />;
};

// Default input
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text here',
};

// Different sizes
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  placeholder: 'Small input',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  placeholder: 'Medium input',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  placeholder: 'Large input',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xl',
  placeholder: 'Extra large input',
};

// Input with icon
export const WithLeftIcon = Template.bind({});
WithLeftIcon.args = {
  placeholder: 'Search...',
  icon: {
    src: 'search', // Assuming "search" is an icon ID in your sprite
    className: 'search-icon',
  },
  iconAlign: 'left',
};

export const WithRightIcon = Template.bind({});
WithRightIcon.args = {
  placeholder: 'Search...',
  icon: {
    src: 'search',
    className: 'search-icon',
  },
  iconAlign: 'right',
};

// Input types
export const EmailInput = Template.bind({});
EmailInput.args = {
  type: 'email',
  placeholder: 'Enter your email',
  
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
  placeholder: 'Enter a number',
};

// Disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Disabled input',
  value: 'This input is disabled',
};

// Focused state
export const Focused = Template.bind({});
Focused.args = {
  focus: true,
  placeholder: 'This input is focused',
};

// Input with initial value
export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Initial value',
  placeholder: 'Enter text',
};

// Error state examples
export const EmailWithError = () => {
  const [value, setValue] = React.useState('invalid-email');
  
  return (
    <QIInput 
      type="email" 
      value={value} 
      onChange={setValue} 
      placeholder="Enter a valid email"
    />
  );
};

export const NumberWithError = () => {
  const [value, setValue] = React.useState('not-a-number');
  
  return (
    <QIInput 
      type="number" 
      value={value} 
      onChange={setValue} 
      placeholder="Enter a number"
    />
  );
};