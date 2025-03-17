import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/tailwindcss/QICheckBox.scss';
/**
 * This is the Check Box Component
 *
 * @param {string} label- Accepts a string as label
 * @param {string} labelclass- Accepts class names for the label
 * @param {string} checkboxClass- Accepts class names for the check box
 * @param {boolean} inline- Accepts a boolean value
 * @param {boolean} checked- Accepts a boolean value for the check box to be checked or not
 * @param {func} changeHandler- Accepts a function
 *
 * @example
 *
 * <QICheckBox label='I Agree' labelclass='label' checkboxClass='check' inline changeHandler={check} />
 */

interface QICheckBoxProps {
  label: string;
  checked?: boolean;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  readOnly?: boolean;
  error?: string;
  id?: string;
  labelclass?: string;
  checkboxClass?: string;
  inline?: boolean;
  [key: string]: any; // For additional props
}

export const QICheckBox: React.FC<QICheckBoxProps> = ({
  label,
  checked,
  value = '',
  onChange,
  className = ' ',
  readOnly,
  error,
  id,
  labelclass,
  checkboxClass,
  inline,
  ...props
}) => {
  return (
    <>
      <div className={`qi-checkbox qi-form-element ${className || ''}`}>
        <label className="qi-checkbox_label" data-testid="input-label" htmlFor={id}>
          {label}
        </label>
        <div className="qi-checkbox_input-wrapper">
          <input
            type="checkbox"
            value={value}
            checked={checked}
            className="qi-checkbox_input"
            onChange={() => onChange(value)}
            disabled={readOnly}
            id={id}
            {...props}
          />
          {!readOnly && <small className="qi-checkbox_error">{error}</small>}
        </div>
      </div>
    </>
  );
};
