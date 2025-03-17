
import React, { useRef, useState, useEffect } from "react";
import '../../styles/tailwindcss/QIDropdown.scss';

// Update the useOutsideAlerter hook with TypeScript typing
const useOutsideAlerter = (ref: React.RefObject<HTMLElement | null>, callBack: () => void): void => {

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callBack();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callBack]);
};

interface QIDropdownProps {
  toggleComponent: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onHide?: () => void;
}

export const QIDropdown: React.FC<QIDropdownProps> = ({ 
  toggleComponent, 
  children, 
  className = "", 
  onHide = () => {} 
}) => {
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(menuRef, () => {
    onHide();
    setShow(false);
  });

  const handleSwitch = (): void => {
    if (show) {
      onHide();
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div className={`qi-dropdown qi-form-element ${className} `} ref={menuRef}>
      <div className="qi-dropdown_toggle" onClick={handleSwitch}>
        {toggleComponent}
      </div>
      {show && (
        <div className={`qi-dropdown_menu ${show ? "visible" : "invisible"}`}>{children}</div>
      )}
    </div>
  );
};
