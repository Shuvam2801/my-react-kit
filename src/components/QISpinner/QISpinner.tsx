import React from "react";
import { loader } from "../../assets";

interface QISpinnerProps {
  type?: 'border' | 'grow';
  size?: 'sm' | 'md' | 'lg' | 'xl' | string | number;
  className?: string;
  show?: boolean;
  [key: string]: any; // For any other props passed via spread
}

/**
 * This is the Spinner Component
 *
 * @param {string} [type : 'border'] - Select type of spinner 'border' or 'grow'
 * @param {string} [size : 'sm'] - Select spinner size acceptable values ["sm", "md", "lg", "xl"]
 * @param {string} className - Add additional class to spinner component
 * @param {boolean} [show:true] - Boolean value to show or hide spinner
 * @example
 *
 * <QISpinner type="grow" size="sm" show={true}>
 */
export const QISpinner: React.FC<QISpinnerProps> = ({ 
  type, 
  className = "", 
  size, 
  ...props 
}) => {
  return (
    <img
      src={loader}
      alt="Loading"
      className="m-auto"
      height={size || "auto"}
      width={size || "auto"}
    />
  );
};
