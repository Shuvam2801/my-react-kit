import React from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "../Shared/SvgIcon";

/**
 * This is the Pagination Component
 *
 * @param {number} pageCount - Accepts a number to set number of pages
 * @param {func} onPageChange - Accepts a function to handle on click will callback with selected page no
 * @param {number} activePage - Accepts a number which denotes the selected page number
 * @example
 *
 * <QIPagination pageCount={10} onPageChange={(requestedPage)=>{}} activePage={1}>
 */

interface QIPaginationProps {
  pageCount: number;
  onPageChange: (page: number) => void;
  activePage: number;
  setDockAlign?: (align: string) => void;
  setShowDetails?: (show: boolean) => void;
  removeLayerOnClose?: () => void;
  setDeviceId?: (id: null) => void;
  setHighlight?: (highlight: null) => void;
}

interface PageItemProps {
  disabled?: boolean;
  pageRef?: number;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
}

export const QIPagination: React.FC<QIPaginationProps> = ({
  pageCount,
  onPageChange,
  activePage,
  setDockAlign,
  setShowDetails,
  removeLayerOnClose,
  setDeviceId,
  setHighlight,
}) => {
  const PageItem: React.FC<PageItemProps> = ({ 
    disabled = false, 
    pageRef, 
    onClick, 
    children,
    active 
  }) => {
    return (
      <li
        className={`qi-pagination_item ${pageRef === activePage ? "active" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onClick={onClick}
      >
        <span className="qi-pagination_item_link">{children}</span>
      </li>
    );
  };

  const onPageChangeHandler = (requestPage: number) => {
    if (requestPage !== activePage && requestPage >= 1 && requestPage <= pageCount) {
      onPageChange(requestPage);
      try {
        if (setShowDetails) setShowDetails(false);
        if (setDockAlign) setDockAlign("cross");
        if (removeLayerOnClose) removeLayerOnClose();
        if (setDeviceId) setDeviceId(null);
        if (setHighlight) setHighlight(null);
      } catch (e) {
        console.error("Error in pagination handler:", e);
      }
    }
  };

  let items: React.ReactNode[] = [];

  const manageEndPages = () => {
    if (activePage === 1) {
      items = [
        <PageItem key="page-1" pageRef={1} onClick={() => onPageChangeHandler(1)}>
          {1}
        </PageItem>,
        pageCount > 1 && (
          <PageItem key="page-2" pageRef={2} onClick={() => onPageChangeHandler(2)}>
            {2}
          </PageItem>
        ),
        pageCount > 2 && <PageItem key="ellipsis-1" onClick={() => {}}>...</PageItem>,
        pageCount > 2 && (
          <PageItem key="page-last" pageRef={pageCount} onClick={() => onPageChangeHandler(pageCount)}>
            {pageCount}
          </PageItem>
        ),
      ].filter(Boolean);
    } else if (activePage === pageCount) {
      items = [
        <PageItem key="page-1" pageRef={1} onClick={() => onPageChangeHandler(1)}>
          {1}
        </PageItem>,
        pageCount > 2 && <PageItem key="ellipsis-1" onClick={() => {}}>...</PageItem>,
        <PageItem key="page-prev" pageRef={activePage - 1} onClick={() => onPageChangeHandler(activePage - 1)}>
          {activePage - 1}
        </PageItem>,
        <PageItem key="page-current" pageRef={activePage} onClick={() => onPageChangeHandler(activePage)}>
          {activePage}
        </PageItem>,
      ].filter(Boolean);
    } else if (activePage === pageCount - 1) {
      items = [
        <PageItem key="page-1" pageRef={1} onClick={() => onPageChangeHandler(1)}>
          {1}
        </PageItem>,
        pageCount > 2 && <PageItem key="ellipsis-1" onClick={() => {}}>...</PageItem>,
        <PageItem key="page-current" pageRef={activePage} onClick={() => onPageChangeHandler(activePage)}>
          {activePage}
        </PageItem>,
        pageCount > 2 && (
          <PageItem key="page-last" pageRef={pageCount} onClick={() => onPageChangeHandler(pageCount)}>
            {pageCount}
          </PageItem>
        ),
      ].filter(Boolean);
    } else if (activePage === pageCount - 2) {
      items = [
        <PageItem key="page-1" pageRef={1} onClick={() => onPageChangeHandler(1)}>
          {1}
        </PageItem>,
        pageCount > 2 && <PageItem key="ellipsis-1" onClick={() => {}}>...</PageItem>,
        <PageItem key="page-current" pageRef={activePage} onClick={() => onPageChangeHandler(activePage)}>
          {activePage}
        </PageItem>,
        pageCount > 2 && (
          <PageItem key="page-next" pageRef={activePage + 1} onClick={() => onPageChangeHandler(activePage + 1)}>
            {activePage + 1}
          </PageItem>
        ),
        pageCount > 2 && (
          <PageItem key="page-last" pageRef={pageCount} onClick={() => onPageChangeHandler(pageCount)}>
            {pageCount}
          </PageItem>
        ),
      ].filter(Boolean);
    } else {
      items = [
        <PageItem key="page-current" pageRef={activePage} onClick={() => onPageChangeHandler(activePage)}>
          {activePage}
        </PageItem>,
        pageCount > activePage + 1 && (
          <PageItem key="page-next" pageRef={activePage + 1} onClick={() => onPageChangeHandler(activePage + 1)}>
            {activePage + 1}
          </PageItem>
        ),
        pageCount > activePage + 2 && <PageItem key="ellipsis-1" onClick={() => {}}>...</PageItem>,
        pageCount > activePage + 2 && (
          <PageItem key="page-last" pageRef={pageCount} onClick={() => onPageChangeHandler(pageCount)}>
            {pageCount}
          </PageItem>
        ),
      ].filter(Boolean);
    }
  };

  if (pageCount >= 5) {
    for (let i = activePage - 2; i <= activePage + 2 && i <= pageCount; i += 1) {
      if (i >= 1) {
        items.push(
          <PageItem 
            key={`page-${i}`} 
            pageRef={i} 
            active={i === activePage} 
            onClick={() => onPageChangeHandler(i)}
          >
            {i}
          </PageItem>
        );
      }
    }
    manageEndPages();
  } else {
    for (let i = 1; i <= pageCount; i += 1) {
      items.push(
        <PageItem 
          key={`page-${i}`} 
          pageRef={i} 
          active={i === activePage} 
          onClick={() => onPageChangeHandler(i)}
        >
          {i}
        </PageItem>
      );
    }
  }

  return (
    <ul className="qi-pagination">
      <PageItem disabled={activePage === 1} onClick={() => onPageChangeHandler(1)}>
        <SvgIcon name="up-arrow-double" wrapperClass="first" svgClass="" />
      </PageItem>
      <PageItem disabled={activePage === 1} onClick={() => onPageChangeHandler(activePage - 1)}>
        <SvgIcon name="up-arrow" wrapperClass="previous" svgClass="" />
      </PageItem>
      {items.map((Item, index) => (
        <React.Fragment key={`item-${index}`}>{Item}</React.Fragment>
      ))}
      <PageItem
        disabled={activePage === pageCount}
        onClick={() => onPageChangeHandler(activePage + 1)}
      >
        <SvgIcon name="up-arrow" wrapperClass="next" svgClass="rotate-180" />
      </PageItem>
      <PageItem disabled={activePage === pageCount} onClick={() => onPageChangeHandler(pageCount)}>
        <SvgIcon name="up-arrow-double" wrapperClass="last" svgClass="rotate-180" />
      </PageItem>
    </ul>
  );
};

QIPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
};