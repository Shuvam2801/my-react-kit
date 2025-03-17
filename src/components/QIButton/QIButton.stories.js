import React from 'react';
import QIButton from './QIButton';

export default {
    title: 'Components/QIButton',
    component: QIButton,
};

const Template = (args) => <QIButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Click Me',
}; 