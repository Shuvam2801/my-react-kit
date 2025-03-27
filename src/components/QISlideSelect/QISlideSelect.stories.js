import React from 'react';
import { QISlideSelect } from './QISlideSelect';
import 'bootstrap/dist/css/bootstrap.min.css';


export default {
    title: 'Components/QISlideSelect',
    component: QISlideSelect,
};

const Template = (args) => <QISlideSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
    pagination: {
        perPage: 20,
        onPerPageChange: (value) => console.log('Per Page Changed:', value),
        onPageChange: (page) => console.log('Page Changed:', page),
    },
    defaultVal: 20,
    range: 20,
    maxCap: 100,
};

export const WithCustomRange = Template.bind({});
WithCustomRange.args = {
    pagination: {
        perPage: 40,
        onPerPageChange: (value) => console.log('Per Page Changed:', value),
        onPageChange: (page) => console.log('Page Changed:', page),
    },
    defaultVal: 20,
    range: 10,
    maxCap: 100,
};

export const AtMaxCap = Template.bind({});
AtMaxCap.args = {
    pagination: {
        perPage: 100,
        onPerPageChange: (value) => console.log('Per Page Changed:', value),
        onPageChange: (page) => console.log('Page Changed:', page),
    },
    defaultVal: 20,
    range: 20,
    maxCap: 100,
}; 