import React, { useState } from 'react';
import { QIRadioButton } from './QIRadioButton';

export default {
  title: 'Components/QIRadioButton',
  component: QIRadioButton,
};

const Template = (args) => {
  const [selectedValue, setSelectedValue] = useState(args.initialValue || null); // Use initialValue from args or default to null

  // Map the radioObjects to include dynamic checked state and onChange handler
  const radioObjectsWithState = args.radioObjects.map((radio) => ({
    ...radio,
    checked: radio.value === selectedValue, // Check if this radio matches the selected value
    onChange: (event) => {
      setSelectedValue(event.target.value); // Update selected value on change
      console.log(`Selected: ${event.target.value}`); // Optional: log the selection
    },
  }));

  return <QIRadioButton {...args} radioObjects={radioObjectsWithState} />;
};

export const Default = Template.bind({});
Default.args = {
  radioObjects: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  radioObjects: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ],
  initialValue: 'option1', // Pre-select "Option 1"
};