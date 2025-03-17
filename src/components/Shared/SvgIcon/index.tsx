import React from 'react';
import sprite from "../../../assets/icons.svg";

interface SvgIconProps {
  wrapperClass?: string;
  svgClass?: string;
  name: string;
  onClick?: () => void;
  title?: string;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  wrapperClass = "",
  svgClass = "",
  name,
  onClick = () => {},
  title = ""
}) => {
  return (
    <span className={`icon-wrapper ${wrapperClass || " "}`} onClick={onClick} title={title}>
      <svg className={`icon ${svgClass || " "}`}>
        <use href={`${sprite}#${name}`} style={{ fill: 'currentColor' }}></use>
      </svg>
    </span>
  );
};
