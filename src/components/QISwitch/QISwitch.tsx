import React from 'react';
import sprite from '../../assets/icons.svg';
import '../../styles/tailwindcss/QISwitch.scss';

interface QISwitchProps {
  label?: string;
  value?: boolean;
  checked?: boolean; // Added based on type declaration
  onChange: (checked: boolean) => void;
  className?: string;
  readOnly?: boolean;
  error?: string;
  disabled?: boolean;
  warningMessage?: string;
  title?: string;
}

export const QISwitch: React.FC<QISwitchProps> = ({ 
  label = '', 
  value, 
  onChange, 
  className = '', 
  readOnly = false, 
  error, 
  disabled = false, 
  warningMessage = '', 
  title 
}) => {
  return (
    <div className={`qi-input qi-form-element ${error && 'error'} ${className || ''} ${disabled && 'disabled'}`} title={title}>
      <label className="qi-input_label" data-testid="input-label">
        {label}
      </label>
      <div className="qi-input_wrapper">
        <div>
          <span className="switch">
            <input type="checkbox" disabled={disabled} checked={value} readOnly />
            <span className="slider round" onClick={readOnly ? () => {} : () => onChange(!value)}></span>
          </span>
        </div>

        {!readOnly && error && (
          <div className="qi-input_error">
            <span className="icon-wrapper">
              <svg className="icon">
                <use href={`${sprite}#info`}></use>
              </svg>
            </span>
            <p className="qi-input_error_message">{error}</p>
          </div>
        )}
        {warningMessage.length > 0 && (
          <div className="qi-input_warning">
            <p className="qi-input_warning_message">{warningMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};
