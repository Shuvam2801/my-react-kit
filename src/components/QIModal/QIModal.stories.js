import React, { useState, useEffect } from 'react';
import { QIModal, QIModalHeader, QIModalBody, QIModalFooter } from './QIModal';
import { QIButton } from '../QIButton/QIButton';
import { QIInput } from '../QIInput/QIInput';

// Create a modal container for Storybook
const ModalContainer = ({ children }) => {
  const [container, setContainer] = useState(null);
  
  useEffect(() => {
    // Create a div to serve as our portal container
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'root');
    document.body.appendChild(portalRoot);
    setContainer(portalRoot);
    
    // Cleanup on unmount
    return () => {
      document.body.removeChild(portalRoot);
    };
  }, []);
  
  return container ? children : null;
};

export default {
  title: 'Components/QIModal',
  component: QIModal,
  decorators: [
    (Story) => (
      <ModalContainer>
        <Story />
      </ModalContainer>
    ),
  ],
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
        options: ['small', 'medium', 'large'],
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
      <QIButton 
        onClick={handleShow} 
        className="qi-btn primary"
      >
        Open Modal
      </QIButton>
      
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
          <QIButton 
            onClick={handleClose}
            className="qi-btn secondary"
          >
            Close
          </QIButton>
          <QIButton 
            onClick={handleClose}
            className="qi-btn primary"
          >
            Save Changes
          </QIButton>
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
      <QIButton 
        onClick={handleShow} 
        className="qi-btn primary"
      >
        Open Long Content Modal
      </QIButton>
      
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
          <QIButton 
            onClick={handleClose}
            className="qi-btn secondary"
          >
            Close
          </QIButton>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

// Template for form within modal
export const FormModal = (args) => {
  const [show, setShow] = useState(args.show || false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Remove TypeScript annotation from handleInputChange
  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  return (
    <>
      <QIButton 
        onClick={handleShow} 
        className="qi-btn primary"
      >
        Open Form Modal
      </QIButton>
      
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
              <QIInput
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Your name"
                size="md"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <QIInput
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="your.email@example.com"
                size="md"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none"
                placeholder="Your message here..."
              ></textarea>
            </div>
          </form>
        </QIModalBody>
        <QIModalFooter>
          <QIButton 
            onClick={handleClose}
            className="qi-btn secondary"
          >
            Cancel
          </QIButton>
          <QIButton 
            onClick={handleClose}
            className="qi-btn primary"
          >
            Submit
          </QIButton>
        </QIModalFooter>
      </QIModal>
    </>
  );
};
FormModal.args = {
  size: 'large', // You can keep or adjust other args as needed
  backdrop: false, // This disables the backdrop click-to-close
  backdropView: true, // This keeps the backdrop visible (optional, adjust as needed)
};

// Template for custom header/no close icon button
export const CustomHeaderModal = (args) => {
  const [show, setShow] = useState(args.show || false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <QIButton 
        onClick={handleShow} 
        className="qi-btn primary"
      >
        Open Custom Header Modal
      </QIButton>
      
      <QIModal 
        {...args} 
        show={show} 
        onHide={handleClose}
      >
        <QIModalHeader onHide={handleClose} closeButton={false} className="bg-blue-100">
          <h4 className="text-lg font-bold text-blue-800">Custom Styled Header</h4>
        </QIModalHeader>
        <QIModalBody>
          <p>This modal has a custom header with no close icon.</p>
        </QIModalBody>
        <QIModalFooter>
          <QIButton 
            onClick={handleClose}
            className="qi-btn secondary"
          >
            Close
          </QIButton>
        </QIModalFooter>
      </QIModal>
    </>
  );
};

