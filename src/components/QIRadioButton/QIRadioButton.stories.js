import React from 'react';
import QIRadioButton from './QIRadioButton';

export default {
    title: 'Components/QIRadioButton',
    component: QIRadioButton,
};

const Template = (args) => <QIRadioButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    radioObjects: [
        { value: 'option1', label: 'Option 1', onChange: () => {}, checked: false },
        { value: 'option2', label: 'Option 2', onChange: () => {}, checked: false },
    ],
}; 