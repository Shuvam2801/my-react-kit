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

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const isEmailValid = (inputValue: string): boolean => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue);
  };

  const isNumberValid = (inputValue: string): boolean => {
    return /^-?\d*\.?\d+$/.test(inputValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value); // Allow users to type freely

    if (type === 'email') {
      setError(''); // Reset error on typing
    } 
    else if (type === 'number') {
      setError(''); 
    } 
    else {
      setError('');
    }
  };

  const handleBlur = (): void => {
    if (type === 'email' && !isEmailValid(value)) {
      setError('Invalid email address'); // Show error message
    } 
    else if (type === 'number' && !isNumberValid(value)) {
      setError('Only numeric values are allowed'); // Ensure only integers are allowed
    } 
    else {
      setError('');
    }
  };

  return (
    <div>
      {icon && icon.src && (
        <span className={`icon-wrapper ${icon.className || ''}`}>
          <svg className="icon">
            <use href={`${sprite}#${icon.src}`}></use>
          </svg>
        </span>
      )}
      <input 
        type={type === 'number' ? 'text' : type} 
        value={value} 
        onChange={handleChange}
        onBlur={handleBlur} 
        disabled={disabled}
        className={`qi-input ${className || ''} ${size || ''}`}
        placeholder={placeholder}
        ref={inputRef}
      />
      {error && <p data-testid="error-message" style={{ color: 'red', fontSize: '12px' }}>{error}</p>} {/* Display error */}
    </div>
  );
};

export default QIInput;

