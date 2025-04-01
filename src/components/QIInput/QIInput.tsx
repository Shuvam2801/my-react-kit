import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../../styles/tailwindcss/QIInput.scss';
import sprite from '../../assets/icons.svg';

interface QIInputProps {
  type?: 'text' | 'email' | 'number';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  iconAlign?: 'left' | 'right';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: {
    src?: string;
    className?: string;
  };
  focus?: boolean;
}

export const QIInput: React.FC<QIInputProps> = ({ 
  type = 'text', 
  disabled = false, 
  size = 'sm', 
  className = '', 
  iconAlign = 'left', 
  value = '', 
  onChange = () => {}, 
  placeholder,
  icon,
  focus
}) => {
  const [error, setError] = useState<string>(''); 
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    // Ensure the container has proper dimensions
    if (containerRef.current && inputRef.current) {
      containerRef.current.style.width = inputRef.current.offsetWidth + 'px';
    }
  }, []);

  const isEmailValid = (inputValue: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue);
  };

  const isNumberValid = (inputValue: string): boolean => {
    return /^-?\d*\.?\d+$/.test(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value); // Allow users to type freely
    setError(''); // Reset error on typing
  };

  const handleBlur = (): void => {
    if (type === 'email' && value && !isEmailValid(value)) {
      setError('Invalid email address'); // Show error message
    } 
    else if (type === 'number' && value && !isNumberValid(value)) {
      setError('Only numeric values are allowed'); // Ensure only integers are allowed
    } 
    else {
      setError('');
    }
  };

  const iconClass = icon?.className || '';
  const iconSrc = icon?.src || '';

  return (
    <div className="qi-input-container" ref={containerRef}>
      {iconSrc && iconAlign === 'left' && (
        <span className={`icon-wrapper ${iconClass}`}>
          <svg className="icon">
            <use href={`${sprite}#${iconSrc}`}></use>
          </svg>
        </span>
      )}
      <input 
        type={type === 'number' ? 'text' : type} 
        value={value} 
        onChange={handleChange}
        onBlur={handleBlur} 
        disabled={disabled}
        className={`qi-input ${className} ${size} ${iconSrc ? (iconAlign === 'right' ? 'input-with-right-icon' : 'input-with-left-icon') : ''}`}
        placeholder={placeholder}
        ref={inputRef}
      />
      {iconSrc && iconAlign === 'right' && (
        <span className={`icon-wrapper icon-right ${iconClass}`}>
          <svg className="icon">
            <use href={`${sprite}#${iconSrc}`}></use>
          </svg>
        </span>
      )}
      {error && <p data-testid="error-message" style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
    </div>
  );
};