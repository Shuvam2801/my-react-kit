import React from 'react';
import { QIFileUploader } from './QIFileUploader';

export default {
    title: 'Components/QIFileUploader',
    component: QIFileUploader,
};

const Template = (args) => <QIFileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: 'Upload File',
    onChange: (files) => console.log(files),
    placeholder: 'Supported formats: PDF, DOC, DOCX',
};

export const WithError = Template.bind({});
WithError.args = {
    label: 'Upload File',
    onChange: (files) => console.log(files),
    placeholder: 'Supported formats: PDF, DOC, DOCX',
    error: 'File size exceeds the limit',
}; 