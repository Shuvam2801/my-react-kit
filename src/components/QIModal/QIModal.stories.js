import React, { useState } from 'react';
import { QIModal, QIModalBody, QIModalHeader, QIModalFooter } from './QIModal';
import {QIButton} from '../QIButton/QIButton';

export default {
    title: 'Components/QIModal',
    component: QIModal,
};

const Template = (args) => {
    const [show, setShow] = useState(true);
    const handleHide = () => setShow(false);

    return (
        <>
            <QIButton label="Open Modal" onClick={() => setShow(true)} />
            <QIModal {...args} show={show} onHide={handleHide}>
                <QIModalHeader onHide={handleHide}>Modal Title</QIModalHeader>
                <QIModalBody>
                    <p>This is the body of the modal.</p>
                </QIModalBody>
                <QIModalFooter>
                    <QIButton label="Close" onClick={handleHide} />
                </QIModalFooter>
            </QIModal>
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    backdrop: true,
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
    backdrop: false,
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
    className: 'custom-modal-class',
}; 