import React from 'react';
import '../../styles/tailwindcss/QIButton.scss';
/**
* This is button which support icons.
*
* @param {string} [type:"button"]- A string param for type of button
* @param {boolean} [disabled:false] - boolean value for disable/enable btn
* @param {string} [size:"sm"] - A string param for size of button anyof("lg","md","sm")
* @param {string} [className: ''] - A string for custom class of button
* @param {text}  [iconAlign:"left"] - Any of ['right','left'] to align icon right/left
* @param {text} [variant:"primary"] - A string for ReactBootstrap button Type
* @param {object} [icon: {
* @param {string}  [height:'30px'],
* @param {string}  [width:'30px'],
* @param {string}  [src: ''],
* @param {oneOf['right','left']} [align:  'left'}] - A object to define props of icon
* @example
* <QIButton
    type="button"
    size="md"
    className="fleet-button"
    icon={{src:img,height:'20px',width:'20px',align:'right'}}
    onClick={() => handleButtonClick()}
    variant="link"
  >
    Click Me
  </QIButton>
 */

interface QIButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: {
    src?: string | React.ReactElement;
    className?: string;
    wrapperClass?: string;
    height?: string;
    width?: string;
    align?: 'right' | 'left';
  };
  onClick?: () => void;
  children?: React.ReactNode;
  loading?: boolean;
  [key: string]: any; // For additional props
}

export const QIButton: React.FC<QIButtonProps> = ({ 
  className = '', 
  type = 'button',
  disabled = false, 
  icon = {}, 
  onClick, 
  children, 
  loading, 
  ...props 
}) => {
  const { className: iconClass, wrapperClass, src } = icon;
  
  return (
    <button 
      data-testid="button" 
      onClick={onClick} 
      type={type} 
      className={`qi-btn ${disabled ? 'disabled' : ''} ${className}`} 
      disabled={disabled}
      {...props}
    >
      <span className="qi-btn_label">{children}</span>
      {src && typeof src === 'string' ? (
        <span className={`icon-wrapper ${wrapperClass || ''}`}>
          <svg className={`icon ${iconClass || ''}`}>
            <use href={src}></use>
          </svg>
        </span>
      ) : (
        src
      )}
    </button>
  );
};
