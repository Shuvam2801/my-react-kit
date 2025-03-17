import React from 'react';
import { useEffect, useState } from "react";
import { SvgIcon } from "../Shared/SvgIcon";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/tailwindcss/QISlideSelect.scss';

interface PaginationProps {
  perPage: number;
  onPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
}

interface QISlideSelectProps {
  pagination: PaginationProps;
  defaultVal?: number;
  range?: number;
  maxCap?: number;
}

/**
 * QISlideSelect Component
 *
 * A component for selecting the number of items to display per page with a sliding mechanism.
 *
 * @param {object} pagination - The pagination object containing onPageChange and onPerPageChange functions.
 * @param {number} [defaultVal=20] - The default value for the number of items per page.
 * @param {number} [range=20] - The range of values to slide by when changing the number of items per page.
 * @param {number} [maxCap=100] - The maximum value for the number of items per page.
 *
 * @example
 * <QISlideSelect pagination={paginationObject} defaultVal={20} range={20} maxCap={100} />
 */
export const QISlideSelect: React.FC<QISlideSelectProps> = ({ 
  pagination, 
  defaultVal = 20, 
  range = 20, 
  maxCap = 100 
}) => {
  const [slideValue, setSlideValue] = useState<number>(pagination.perPage);

  useEffect(() => {
    // Check if slideValue is different from the current value
    if (slideValue !== pagination.perPage) {
      // Update pagination only when slideValue changes and is different
      pagination.onPerPageChange(slideValue);
      pagination.onPageChange(1);
    }
  }, [slideValue, pagination]);

  /**
   * Handle click events for the previous and next buttons.
   *
   * @param {string} arg - The argument specifying whether to slide "prev" or "next".
   */
  const handleClick = (arg: "prev" | "next") => {
    if (arg === "prev" && slideValue > defaultVal) {
      setSlideValue((prev) => prev - range);
    }
    if (arg === "next" && slideValue >= defaultVal && slideValue < maxCap) {
      setSlideValue((prev) => prev + range);
    }
  };

  return (
    <>
      <div className="qi-slide-select">
        {slideValue !== defaultVal && (
          <div onClick={() => handleClick("prev")} className="slide">
            <SvgIcon name="up-arrow" wrapperClass="previous" svgClass="" />
          </div>
        )}
        <div className="slide-display">{slideValue}</div>
        {slideValue !== maxCap && (
          <div onClick={() => handleClick("next")} className="slide">
            <SvgIcon name="up-arrow" wrapperClass="next" svgClass="rotate-180" />
          </div>
        )}
      </div>
    </>
  );
};
