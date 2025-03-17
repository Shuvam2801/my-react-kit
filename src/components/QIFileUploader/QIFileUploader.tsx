import React, { useEffect, useRef, useState } from 'react';
import sprite from "../../assets/icons.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/tailwindcss//QIFileUploader.scss';

interface QIFileUploaderProps {
  label: string;
  value?: any;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  onChange: (files: FileList | null) => void;
  placeholder?: string;
}

export const QIFileUploader: React.FC<QIFileUploaderProps> = ({
  label,
  value,
  error,
  disabled,
  readOnly,
  className,
  onChange,
  placeholder,
}) => {
  return (
    <div
      className={`qi-input qi-form-element ${error ? "error" : ""} ${readOnly ? "disabled" : ""} ${
        className || ""
      }`}
    >
      <label className="qi-input_label" data-testid="input-label">
        {label}
      </label>

      <div className="qi-input_wrapper">
        <div className="qi-input_text w-full flex items-center">
          <div>
            <input 
              type="file" 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.files)} 
              disabled={disabled || readOnly}
            />
          </div>

          <small className="text-orange-300">{placeholder}</small>
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
      </div>
    </div>
  );
};
