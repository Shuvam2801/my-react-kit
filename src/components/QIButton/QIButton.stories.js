import React from 'react';
import {QIButton} from './QIButton';
import sprite from '../../assets/icons.svg';
//import '../../styles/tailwindcss/QIButton.scss';

export default {
  title: 'Components/QIButton',
  component: QIButton,
};

const Template = (args) => <QIButton {...args} />;

export const Default = Template.bind({});
Default.storyName = 'Primary';
Default.args = {
  children: 'Click Me',
  type: 'button',
  className:"qi-btn primary",
  disabled: false,
  loading: false,
};

export const WithIcon = Template.bind({});
WithIcon.storyName = 'Secondary with Icon';
WithIcon.args = {
  children: 'Upload',
  icon: {
    src: `${sprite}#upload`, height: '20px', width: '20px', align: 'right' ,
    height: '20px',
    width: '20px',
    align: 'left',
  },
  type: 'button',
  className:"qi-btn secondary",
  disabled: false,
  loading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled Button',
  type: 'button',
  disabled: true,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Loading...',
  type: 'button',
  disabled: false,
  loading: true,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  children: 'Custom Class Button',
  type: 'button',
  className: 'custom-button-class',
  disabled: false,
  loading: false,
};