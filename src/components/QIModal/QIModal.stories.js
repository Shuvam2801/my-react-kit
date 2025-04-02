import React, { useState } from 'react';
import { QIModal, QIModalHeader, QIModalBody, QIModalFooter } from './QIModal';

export default {
  title: 'Components/QIModal',
  component: QIModal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', 'xlarge'],
      },
      defaultValue: 'large',
    },
    backdrop: {
      control: 'boolean',
      defaultValue: true,
    },
    backdropView: {
      control: 'boolean',
      defaultValue: true,
    },
    show: {
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      control: 'text',
    },
  },
};

// Template for the basic modal
const Template = (args) => {
  const [show, setShow] = useState(args.show || false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button 
        onClick={handleShow} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Open Modal
      </button>
      
      <QIModal 
        {...args} 
        show={show} 
        onHide={handleClose}
      >
        <QIModalHeader onHide={handleClose}>Modal Title</QIModalHeader>
        <QIModalBody>
          <p>This is a simple modal body content.</p>
        </QIModalBody>
        <QIModalFooter>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400"
          >
            Close
          </button>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  size: 'large',
  backdrop: true,
  backdropView: true,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  backdrop: true,
  backdropView: true,
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  backdrop: true,
  backdropView: true,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  backdrop: true,
  backdropView: true,
};

export const XLarge = Template.bind({});
XLarge.args = {
  size: 'xlarge',
  backdrop: true,
  backdropView: true,
};

export const NoBackdropClick = Template.bind({});
NoBackdropClick.args = {
  size: 'large',
  backdrop: false,
  backdropView: true,
};

export const NoBackdropView = Template.bind({});
NoBackdropView.args = {
  size: 'large',
  backdrop: true,
  backdropView: false,
};

// Template for a long content modal to demonstrate scrolling
export const LongContentModal = (args) => {
  const [show, setShow] = useState(args.show || false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button 
        onClick={handleShow} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Open Long Content Modal
      </button>
      
      <QIModal 
        {...args} 
        show={show} 
        onHide={handleClose}
      >
        <QIModalHeader onHide={handleClose}>Long Content Modal</QIModalHeader>
        <QIModalBody>
          <p>This modal contains a lot of content to demonstrate scrolling behavior.</p>
          <div className="mt-4">
            {Array(20).fill(null).map((_, index) => (
              <p key={index} className="my-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
                nisi vel consectetur euismod, nisi nisi consectetur nisi, euismod nisi vel 
                consectetur euismod nisi nisi consectetur nisi.
              </p>
            ))}
          </div>
        </QIModalBody>
        <QIModalFooter>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

export const LongContent = LongContentModal.bind({});
LongContent.args = {
  size: 'large',
  backdrop: true,
  backdropView: true,
};

// Template for form within modal
export const FormModal = (args) => {
  const [show, setShow] = useState(args.show || false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button 
        onClick={handleShow} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Open Form Modal
      </button>
      
      <QIModal 
        {...args} 
        show={show} 
        onHide={handleClose}
      >
        <QIModalHeader onHide={handleClose}>Form Example</QIModalHeader>
        <QIModalBody>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message here..."
              ></textarea>
            </div>
          </form>
        </QIModalBody>
        <QIModalFooter>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

export const Form = FormModal.bind({});
Form.args = {
  size: 'medium',
  backdrop: true,
  backdropView: true,
};

// Template for custom header/no close button
export const CustomHeaderModal = (args) => {
  const [show, setShow] = useState(args.show || false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <button 
        onClick={handleShow} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
      >
        Open Custom Header Modal
      </button>
      
      <QIModal 
        {...args} 
        show={show} 
        onHide={handleClose}
      >
        <QIModalHeader onHide={handleClose} closeButton={false} className="bg-blue-100">
          <h4 className="text-lg font-bold text-blue-800">Custom Styled Header</h4>
        </QIModalHeader>
        <QIModalBody>
          <p>This modal has a custom header with no close button.</p>
        </QIModalBody>
        <QIModalFooter>
          <button 
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

export const CustomHeader = CustomHeaderModal.bind({});
CustomHeader.args = {
  size: 'medium',
  backdrop: true,
  backdropView: true,
};