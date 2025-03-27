import React, { useState } from 'react';
import {QICheckBox} from './QICheckBox';

export default {
  title: 'Components/QICheckBox',
  component: QICheckBox,
};

const Template = (args) => {
  const [checked, setChecked] = useState(args.checked);

  const handleChange = (value) => {
    setChecked(!checked);
    args.onChange(value);
  };

  return (
    <QICheckBox
      {...args}
      checked={checked}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'I Agree',
  checked: false,
  onChange: (value) => console.log('Checkbox value:', value),
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'I Agree',
  checked: true,
  onChange: (value) => console.log('Checkbox value:', value),
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'I Agree',
  readOnly: true,
  onChange: (value) => console.log('Checkbox value:', value),
};

export const WithRequirement = Template.bind({});
WithRequirement.args = {
  label: 'I Agree',
  error: 'This field is required',
  onChange: (value) => console.log('Checkbox value:', value),
};