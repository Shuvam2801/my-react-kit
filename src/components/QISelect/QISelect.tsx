import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/tailwindcss/QISelect.scss';

interface QISelectProps {
  label: string;
  value?: string;
  className?: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
  [key: string]: any; // For additional props passed via spread
}

/**
 * This is the Select Component
 *
 * @param {string} label - Accepts a string as label
 * @param {string} labelclass - Accepts class names
 * @param {string} inputclass - Accepts class name
 * @param {string} error - Accepts a string to be shown below the input field (optional)
 *
 * @example
 *
 * <QISelect label="Select :" labelclass="labelstyle" selectclass="selectstyle" error="Required" />
 */
export const QISelect: React.FC<QISelectProps> = ({ 
  label, 
  children, 
  value, 
  className = '', 
  error, 
  onChange, 
  disabled,
  ...props 
}) => {
  return (
    <div className={`qi-select ${className || ''}`}>
      <label className="qi-select_label">{label}</label>
      <div className="qi-select_wrapper">
        <select
          value={value || ''}
          className={`qi-select_text ${disabled ? 'qi-select_text_disabled' : ''}`}
          onChange={onChange}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>
        {!disabled && <small className="qi-select_error">{error}</small>}
      </div>
    </div>
  );
};
