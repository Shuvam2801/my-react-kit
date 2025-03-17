import React from 'react';
import QIInput from './QIInput';

export default {
    title: 'Components/QIInput',
    component: QIInput,
};

const Template = (args) => <QIInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Input Label',
    value: '',
    onChange: (e) => console.log(e.target.value),
}; 