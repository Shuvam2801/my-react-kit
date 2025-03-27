import React, { useState } from 'react';
import QIInput from './QIInput';

export default {
  title: 'Components/QIInput',
  component: QIInput,
};

const Template = (args) => {
  const [inputValue, setInputValue] = useState(args.value || ''); // Initialize with args.value or empty string
  return (
    <QIInput
      {...args}
      value={inputValue} // Use local state for value
      onChange={(value) => {
        setInputValue(value); // Update state when user types
        console.log(value); // Optional: keep logging
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '', // Initial value
  placeholder: 'Enter text here',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  value: '',
  placeholder: 'Enter text with icon',
  icon: {
    src: 'some-icon-id',
    className: 'custom-icon-class',
  },
  iconAlign: 'left',
};