import React from "react";
import ReactDOM from "react-dom";
import PropTypes, { element } from "prop-types";
import sprite from "../../assets/icons.svg";
//import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/tailwindcss/QIModal.scss';
/**
 * This is the Modal Component
 *
 * @param {boolean} show - Accepts a boolean value for enabling/disabling the modal (Required)
 * @param {array} children- Accepts array of elements to be shown inside the modal (Required)
 * @param {boolean} animation - Accepts a boolean value for enabling/disabling the animation of the modal
 * @param {boolean} autoFocus - Accepts a boolean value for shifting focus to the modal
 * @param {boolean} backdrop - Accepts a boolean value to include a backdrop component for the modal
 * @param {boolean} centered - Accepts a boolean value for vertically positioning the modal
 * @param {string} size - Accepts strings ('sm', 'lg', 'md', 'xl') for assigning the size of the modal
 * @param {boolean} scrollable - Accepts a boolean value for making the modal scrollable
 * @param {func} onShow - Accepts a function which will get triggered on the onShow event of the modal
 * @param {func} onHide - Accepts a function which will get triggered on the onHide event of the modal
 *
 * @example
 *
 * <QIModal show={show} animation={false} size="lg" centered scrollable onShow={handleShow} onHide={handleClose}>
 */

interface QIModalProps {
  children: React.ReactNode;
  show: boolean;
  backdrop?: boolean;
  onHide: () => void;
  className?: string;
  size?: string;
  backdropView?: boolean;
  animation?: boolean;
  autoFocus?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  onShow?: () => void;
}

export const QIModal: React.FC<QIModalProps> = ({
  children,
  show,
  backdrop = true,
  onHide,
  className = "",
  size = "large",
  backdropView = true,
}) => {
  const appRoot = document.getElementById("root");
  
  if (!appRoot) {
    throw new Error("Root element not found");
  }

  return ReactDOM.createPortal(
    <>
      {show ? (
        <>
          <div
            className={`qi-modal ${className}`}
            onClick={backdrop ? onHide : () => {}}
            tabIndex={-1}
          >
            <div className={`qi-modal_dialog ${size}`} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <div className="qi-modal_content border border-gray-400 shadow-md shadow-gray-400">
                {children}
              </div>
            </div>
          </div>
          <div className={`${backdropView && "qi-modal_backdrop"}`}></div>
        </>
      ) : (
        <></>
      )}
    </>,
    appRoot
  );
};

/**
 * This is the Header of the Modal Component
 *
 * @param {string} children- Accepts string to be shown inside the modal header (Required)
 * @param {func} onHide- Accepts a function which will be triggered on clicking the closeButton on the header of the modal
 * @param {bool} closeButton- Accepts boolean value to show/not show the close button on the header of the modal
 * @param {string} closeLabel- Accepts string to provide a label for the closeButton on the header of the modal
 *
 * @example
 *
 *  <QIModalHeader onHide={handleHide} closeButton closeLabel="Cancel">Title</QIModalHeader>
 */

interface QIModalHeaderProps {
  children: React.ReactNode;
  onHide: () => void;
  className?: string;
  closeButton?: boolean;
  closeLabel?: string;
}

export const QIModalHeader: React.FC<QIModalHeaderProps> = ({ 
  children, 
  onHide, 
  className = "", 
  closeButton = true 
}) => {
  return (
    <div className={`qi-modal_header ${className}`}>
      {children}
      {closeButton && onHide && (
        <button className="qi-modal_close" onClick={onHide}>
          <span className="icon-wrapper">
            <svg className="icon">
              <use href={`${sprite}#cross`}></use>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

/**
 * This is the Body of the Modal Component
 *
 * @param {string} children- Accepts string to be shown inside the modal body (Required)
 *
 * @example
 *
 * <QIModalBody>Body</QIModalBody>
 */

interface QIModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const QIModalBody: React.FC<QIModalBodyProps> = ({ children, className = "" }) => {
  return (
    <div className={`qi-modal_body ${className}`}>{children}</div>
  );
};

/**
 * This is the Footer of the Modal Component
 *
 * @param {element} children- Accepts elementsto be shown inside the modal footer (Required)
 *
 * @example
 *
 * <QIModalFooter> <QIButton onClick={handleClose}> OK </QIButton> </QIModalFooter>
 */

interface QIModalFooterProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const QIModalFooter: React.FC<QIModalFooterProps> = ({ children, className = "", ...props }) => {
  return <div className={`qi-modal_footer ${className}`} {...props}>{children}</div>;
};
