import React, { useEffect, useState, useRef } from 'react';
import { QICheckBox } from '../QICheckBox/QICheckBox';
import '../../styles/tailwindcss/QIList.scss';

interface ListColumn {
  label: string;
  key: string;
  checkbox?: boolean;
  statusKey?: string;
  className?: string;
  type?: string;
  component?: React.ComponentType<{ data: any }>;
  nestedValue?: boolean;
  getNestedValue?: (item: any) => any;
  alternate?: string;
  width?: string;
}

interface ListHandler {
  allSelectHandler?: () => void;
  checkboxHandler?: (element: any) => void;
  rowHandler?: (element: any) => void;
  [key: string]: any;
}

interface QIListProps {
  columns: ListColumn[];
  striped?: boolean;
  className?: string;
  handler: ListHandler;
  data?: any[];
  status?: any[];
  listKey?: Record<string, string>;
  maxHeight?: string;
  highlight?: string | number;
  setHighlight?: (id: string | number) => void;
  listType?: string;
  detailedView?: boolean;
  detailedData?: (element: any) => React.ReactNode;
  listHeaderOptions?: string;
  hover?: boolean;
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl';
  customScrollbar?: boolean;
  scrollbarHeight?: string;
}

export const QIList: React.FC<QIListProps> & { defaultProps?: Partial<QIListProps> } = ({
  columns,
  striped,
  className,
  handler,
  data = [],
  status = [],
  listKey,
  maxHeight = '100%',
  highlight,
  setHighlight,
  listType,
  detailedView = false,
  detailedData,
  listHeaderOptions,
  customScrollbar = true,
  scrollbarHeight = '400px',
  ...props
}) => {
  const [listData, setListData] = useState<any[]>(data);
  const listBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const getDisplayText = (text: any) => {
    if (text === 0) return '0';
    if (!text) return '';
    return text;
  };

  const getTooltip = (column: ListColumn, rowData: any) => {
    let title = '';
    if (column.nestedValue && column.getNestedValue) {
      const nestedValue = column.getNestedValue(rowData);
      const typeofNestedValue = typeof nestedValue;
      if (typeofNestedValue === 'string' || typeofNestedValue === 'number') {
        title = nestedValue;
      } else {
        title = rowData[column.key] || column.alternate || '';
      }
    } else {
      title = rowData[column.key] || column.alternate || '';
    }
    return title === undefined || title === null ? '' : `${title}`;
  };

  return (
    <section className={`qi-list ${className || ''} ${customScrollbar ? 'custom-scrollbar' : ''}`}>
      {listHeaderOptions !== 'hidden' && (
        <div className="qi-list_header">
          {columns.map((column, index) => (
            <div
              data-testid="column-header"
              key={index}
              className={`qi-list_column ${column.className || ''}`}
              title={column.label}
              style={{ width: column.width }}
            >
              {column.checkbox && handler.allSelectHandler && (
                <QICheckBox 
                  label="" 
                  checked={status.length === listData.length && listData.length > 0} 
                  onChange={() => handler.allSelectHandler?.()}
                />
              )}
              {column.label}
            </div>
          ))}
        </div>
      )}

      <div 
        className="qi-list_body" 
        ref={listBodyRef}
        style={{ 
          maxHeight: scrollbarHeight,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        <ul className="qi-list_list">
          {listData.length === 0 ? (
            <li className="qi-list_empty">No data available</li>
          ) : (
            listData.map((element, index) => (
              <li
                data-testid="list-row"
                key={index}
                id={element?.id || `row-${index}`}
                onClick={() => {
                  handler.rowHandler?.({...element});
                  try {
                    if (setHighlight) {
                      setHighlight(element?.id || element?.packet_id);
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
                className={`qi-list_list_item-wrapper ${striped && index % 2 === 1 ? 'striped' : ''}`}
              >
                <div
                  className={`qi-list_list_item ${element.className || ''} ${
                    (element?.id || element?.packet_id) === highlight ? 'selected' : ''
                  }`}
                >
                  {columns.map((column, colIndex) => (
                    <React.Fragment key={colIndex}>
                      {column.checkbox && handler.checkboxHandler && column.statusKey && (
                        <div 
                          data-testid="list-cell" 
                          className={`qi-list_column ${column.className || ''}`}
                          style={{ width: column.width }}
                        >
                          <QICheckBox 
                            label="" 
                            onChange={() => handler.checkboxHandler?.(element)} 
                            checked={status.includes(element[column.statusKey])} 
                          />
                        </div>
                      )}
                      {!column.checkbox && column.type === 'component' && column.component && (
                        <div 
                          data-testid="list-cell" 
                          className={`qi-list_column ${column.className || ''}`}
                          style={{ width: column.width }}
                        >
                          <column.component data={element} />
                        </div>
                      )}
                      {!column.checkbox && !column.type && (
                        <div
                          data-testid="list-cell"
                          className={`qi-list_column ${column.className || ''}`}
                          title={getTooltip(column, element)}
                          onClick={handler[column.key] ? () => handler[column.key](element) : undefined}
                          style={{ width: column.width }}
                        >
                          {column.nestedValue && column.getNestedValue 
                            ? column.getNestedValue(element) 
                            : getDisplayText(element[column.key]) || column.alternate}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                {detailedView && detailedData && detailedData(element)}
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

QIList.defaultProps = {
  handler: {},
  hover: true,
  striped: true,
  responsive: 'lg',
  className: '',
  data: [],
  status: [],
  customScrollbar: true,
  scrollbarHeight: '400px'
};