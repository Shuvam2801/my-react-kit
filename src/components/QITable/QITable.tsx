import React, { useEffect, useState } from 'react';
import { QICheckBox } from '../QICheckBox/QICheckBox';
import sprite from './assets.svg';
import '../../styles/tailwindcss/QITable.scss';

interface TableHeader {
  label: string;
  key: string;
  sortable?: boolean;
  defaultSort?: boolean;
  checkbox?: boolean;
  statusKey?: string;
  className?: string;
  type?: string;
  component?: React.ComponentType<{ data: any }>;
  nestedValue?: boolean;
  getNestedValue?: (item: any) => any;
  alternate?: string;
}

interface TableHandler {
  allSelectHandler?: () => void;
  checkboxHandler?: (element: any) => void;
  rowHandler?: (element: any) => void;
  sortingHandler: (key: string, sortType: string) => void;
  [key: string]: any;
}

interface QITableProps {
  headers: TableHeader[];
  striped?: boolean;
  className?: string;
  handler: TableHandler;
  data?: any[];
  status?: any[];
  tableKey?: Record<string, string>;
  maxHeight?: string;
  highlight?: string | number;
  setHighlight?: (id: string | number) => void;
  listType?: string;
  detailedView?: boolean;
  detailedData?: (element: any) => React.ReactNode;
  listHeaderOptions?: string;
  hover?: boolean;
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * This is a Table with dynamic number of headers.
 *
 * @param {object} header - An array of objects having list of headers with key
 * header : [
 * {checkbox:true , statusKey: 'id'} // checkbox: if want to render checkbox, statusKey: an key in data-item
  { label: 'Name', key: 'name', sortable: true, defaultSort: true },
  { label: 'Email', key: 'email' },
  { label: 'Age', key: age, sortable: true },
  { label: 'action', type: component, component: ReactComponent } // Will pass row data as data props to React component
  { label: 'Address', nestedValue:true, getNestedValue:()=>getNestedValue(element)} // pass a function to parse nested value
];
 * @param {object}  handler - An object containing functions with key same as header key
 * handler: {
    @param allSelectHandler: A function within handler to select all row. // will get call back when all the rows are selected
    @param checkboxHandler:  A function within handler to select individual  row having parameter to select the row data,
    @param rowHandler: A callback function to onClick event of any row,
  },
 * @param {string}  className - A string to set class to root node
 * @param {array} status - An array which consist the main key to denote a item is selected or not
 * @param {array}  data - An array for data (first priority over fetchData)
 * data: data = [
  { key: 1, name: 'Rahul', email: 'rajsrivastvaa@gmail.com',age: '22' },
  { key: 2, name: 'Rohit', email: 'rajsrivastvaa@gmail.com',age: '21' },
  { key: 3, name: 'Rama', email: 'rajsrivastvaa@gmail.com', age: '23' },
  { key: 4, name: 'Abhishek', email: 'rajsrivastvaa@gmail.com', age: '24' },
  { key: 5, name: 'Abhinav', email: 'rajsrivastvaa@gmail.com', age: '25' },
];
 * @example
 *  <QITable
 *    data={data}
 *    fetchData={() => fetchData}
 *    handler={handler}
 *    headers={headers} />
 *
 */
let sortingStatus: Record<string, boolean> = {};
let currentSortKey: string | false = false;
let sortType: 'asc' | 'desc' = 'asc';

// Needed to define the SvgIcon component that's missing in the provided code
interface SvgIconProps {
  name: string;
  wrapperClass?: string;
  svgClass?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, wrapperClass = '', svgClass = '' }) => (
  <span className={wrapperClass}>
    <svg className={svgClass}>
      <use href={`${sprite}#${name}`}></use>
    </svg>
  </span>
);

export const QITable: React.FC<QITableProps> & { defaultProps?: Partial<QITableProps> } = ({
  headers,
  striped,
  className,
  handler,
  data = [],
  status = [],
  tableKey,
  maxHeight = '100%',
  highlight,
  setHighlight,
  listType,
  detailedView = false,
  detailedData,
  listHeaderOptions,
  ...props
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [showDetails, setShowDetails] = useState<Record<string | number, boolean>>({});

  useEffect(() => {
    const initialShowDetails: Record<string | number, boolean> = {};
    tableData.forEach((item) => {
      if (item.id) {
        initialShowDetails[item.id] = false;
      }
    });
    setShowDetails(initialShowDetails);
  }, [tableData]);

  useEffect(() => {
    for (let i = 0; i < headers.length; i += 1) {
      if (!currentSortKey && headers[i].defaultSort) {
        currentSortKey = headers[i].key;
      }
      sortingStatus = { ...sortingStatus, [headers[i].key]: false };
    }
    if (currentSortKey) {
      sortingStatus[currentSortKey] = true;
    }
  }, [headers]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const sort = (sortingKey: string) => {
    if (currentSortKey === sortingKey) {
      sortType = sortType === 'asc' ? 'desc' : 'asc';
    } else {
      if (currentSortKey) {
        sortingStatus[currentSortKey] = false;
      }
      currentSortKey = sortingKey;
      sortingStatus[currentSortKey] = true;
      sortType = 'asc';
    }
    // Have to add API CALL SUCH THAT COMPONENT WILL BE RERENDERED
    handler.sortingHandler(sortingKey, sortType);
  };

  const getDisplayText = (text: any) => {
    if (text === 0) {
      return '0';
    }
    if (!text) {
      return '';
    }
    return text;
  };

  const getTooltip = (header: TableHeader, rowData: any) => {
    let title = '';

    if (header.nestedValue && header.getNestedValue) {
      const nestedValue = header.getNestedValue(rowData);
      const typeofNestedValue = typeof nestedValue;
      if (typeofNestedValue === 'string' || typeofNestedValue === 'number') {
        title = nestedValue;
      } else {
        title = rowData[header.key] || header.alternate || '';
      }
    } else {
      title = rowData[header.key] || header.alternate || '';
    }
    if (title === undefined || title === null) {
      return ``;
    } else return `${title}`;
  };

  const handleDetails = (element: any) => {
    setShowDetails((prevState) => {
      const updatedState: Record<string | number, boolean> = {};

      for (const key in prevState) {
        // Set the specific key to its inverse value
        if (key == element.id) {
          updatedState[key] = !prevState[key];
        } else {
          // Set other keys to false
          updatedState[key] = false;
        }
      }
      return updatedState;
    });
  };

  // FIX: Handle default sort separately outside the render function
  const checkAndInitializeDefaultSort = () => {
    for (const header of headers) {
      if (header.defaultSort && currentSortKey === false) {
        currentSortKey = header.key;
        sortingStatus[header.key] = true;
        return true;
      }
    }
    return false;
  };

  // Initialize default sort if needed
  useEffect(() => {
    checkAndInitializeDefaultSort();
  }, [headers]);

  return (
    <section className={`qi-list-view ${className || ''}`}>
      {listHeaderOptions !== 'tracking-portal' && (
        <div className="qi-list-view_header">
          {headers.map((element, index) => (
            <div
              data-testid="sort"
              key={index}
              className={`qi-list-view_column ${element.className || ''}`}
              onClick={element.sortable ? () => sort(element.key) : undefined}
              title={element.label}
            >
              {element.checkbox && handler.allSelectHandler && (
                <QICheckBox 
                  label="" 
                  checked={status.length === tableData.length} 
                  // FIX: Add optional chaining to prevent calling undefined
                  onChange={() => handler.allSelectHandler?.()}
                />
              )}
              {element.label}
              {/* FIX: Move default sort logic to useEffect */}
              {element.sortable && (
                <span className={`icon-wrapper ${sortingStatus[element.key] ? 'active' : ''}`}>
                  <svg className="icon">
                    <use href={`${sprite}#${sortingStatus[element.key] && sortType === 'desc' ? 'down-up' : 'down-arrow'}`}></use>
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <ul className="qi-list-view_list">
        {tableData.map((element, index) => {
          return (
            <li
              data-testid="tr"
              key={index}
              id={element?.device_id}
              onClick={() => {
                // FIX: Add optional chaining
                handler.rowHandler?.({...element});
                try {
                  if (setHighlight) {
                    setHighlight(element?.id || element?.packet_id);
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              className={`qi-list-view_list_item-wrapper ${showDetails[element.id || element?.packet_id] ? 'expanded' : ''}`}
            >
              <div
                className={`qi-list-view_list_item ${element.className || ''} ${
                  (element?.id || element?.packet_id) === highlight && (listType === 'Trips' || listType === 'Events' || listType === 'Vehicles')
                    ? 'selected'
                    : ''
                }`}
              >
                {headers.map((header, index) => (
                  <React.Fragment key={index}>
                    {header.checkbox && handler.checkboxHandler && header.statusKey && (
                      <div data-testid="td" key={header.key} className={`qi-list-view_column ${header.className || ''}`}>
                        <QICheckBox 
                          label="" 
                          // FIX: Add optional chaining
                          onChange={() => handler.checkboxHandler?.(element)} 
                          checked={status.includes(element[header.statusKey])} 
                        />
                      </div>
                    )}
                    {!header.checkbox && header.type === 'component' && header.component && (
                      <div data-testid="td" key={header.key} className={`qi-list-view_column ${header.className || ''}`}>
                        <header.component data={element} />
                      </div>
                    )}
                    {!header.checkbox && !header.type && (
                      <div
                        data-testid="td"
                        key={header.key}
                        className={`qi-list-view_column ${header.className || ''}`}
                        title={getTooltip(header, element)}
                        onClick={handler[header.key] ? () => handler[header.key](element) : undefined}
                      >
                        {header.nestedValue && header.getNestedValue 
                          ? header.getNestedValue(element) 
                          : getDisplayText(element[header.key]) || header.alternate}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {detailedView && (
                  <span className="expand" onClick={() => handleDetails(element)}>
                    <SvgIcon name="up-arrow" wrapperClass="icon-expand" />
                  </span>
                )}
              </div>
              {showDetails[element.id] && detailedData && detailedData(element)}
            </li>
          );
        })}
      </ul>
    </section>
  );
};


QITable.defaultProps = {
  handler: {
    sortingHandler: (key: string, sortType: string) => { /* Default empty implementation */ }
  },
  hover: true,
  striped: true,
  responsive: 'lg',
  className: '',
  data: [],
  status: [],
};

