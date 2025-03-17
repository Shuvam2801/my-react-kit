import React from 'react';
import { QISelect } from './QISelect';

export default {
    title: 'Components/QISelect',
    component: QISelect,
};

const Template = (args) => <QISelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Select an option:',
    value: '',
    onChange: (event) => console.log(event.target.value),
    children: [
        <option key="1" value="option1">Option 1</option>,
        <option key="2" value="option2">Option 2</option>,
        <option key="3" value="option3">Option 3</option>,
    ],
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Select an option:',
    value: '',
    onChange: (event) => console.log(event.target.value),
    error: 'This field is required',
    children: [
        <option key="1" value="option1">Option 1</option>,
        <option key="2" value="option2">Option 2</option>,
        <option key="3" value="option3">Option 3</option>,
    ],
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Select an option:',
    value: '',
    onChange: (event) => console.log(event.target.value),
    disabled: true,
    children: [
        <option key="1" value="option1">Option 1</option>,
        <option key="2" value="option2">Option 2</option>,
        <option key="3" value="option3">Option 3</option>,
    ],
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
    label: 'Select an option:',
    value: 'option2',
    onChange: (event) => console.log(event.target.value),
    children: [
        <option key="1" value="option1">Option 1</option>,
        <option key="2" value="option2">Option 2</option>,
        <option key="3" value="option3">Option 3</option>,
    ],
}; 