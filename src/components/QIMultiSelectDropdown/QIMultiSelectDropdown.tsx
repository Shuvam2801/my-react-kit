import React, { useState, useMemo, useEffect } from "react";
import sprite from "../../assets/icons.svg";
import { Scrollbars } from "react-custom-scrollbars";
import { QIDropdown } from "../QIDropdown/QIDropdown";
import { QIInput } from "../QIInput/QIInput";
import '../../styles/tailwindcss/QIMultiSelectDropdown.scss';
//import { displayTableConfigName } from "../../containers/Tracking/utils";

/**
 * This is the Chip Component
 *
 * @param {array} data- Accepts a data array of objects filtered by query params for searching
 * @param {array} allData- Accepts a data array of objects
 * @param {func/string} labelKey- Accepts a string/function for label
 * @param {integer/string} labelKey- Accepts an key for the chip to be deleted
 * @param {func} onDelete- Accepts a function for deleting a chip when confirmed
 * @param {func} onDeleteRequest- Accepts a function for wanting to delete a chip
 * @param {func} onDeleteRequestCancel- Accepts a function for cancelling the request to delete a chip
 * @param {boolean} readOnly- Accepts a boolean value for the dropdown to be disabled or not
 * @param {func} actionError- Accepts a callback function for handling titles
 * @param {func} getRowClass- Accepts a callback function for handling classnames for each dropdown
 * @param {func} isSelectable- Accepts a callback function for handling whether a particular chip is selectable
 */

interface ChipData {
  id: string | number;
  name?: string;
  [key: string]: any;
}

interface QIChipProps {
  data?: ChipData;
  allData?: ChipData;
  labelKey: string | ((data: ChipData) => string);
  deleteKey: string | number | null;
  onDelete: (data: ChipData) => void;
  onDeleteRequest: (data: ChipData) => void;
  onDeleteRequestCancel: () => void;
  readOnly?: boolean;
  actionError?: (data: ChipData) => string;
  getRowClass?: (data: ChipData) => string;
  isSelectable?: (data: ChipData) => boolean;
  isDeletable?: (data: ChipData) => boolean;
  variableData?: Record<string, any>;
}

const QIChip: React.FC<QIChipProps> = ({
  data,
  allData,
  labelKey,
  deleteKey,
  onDelete,
  onDeleteRequest,
  onDeleteRequestCancel,
  readOnly,
  actionError = () => "",
  getRowClass = () => "",
  isSelectable = () => true,
  isDeletable = () => true,
  variableData,
}) => {
  const chipData = allData || data;

  if (!chipData) {
    return null;
  }

  return (
    <>
      {(allData || data) && (
        <span
          className={`qi-chip ${deleteKey === chipData.id ? "alert" : ""} ${
            getRowClass(chipData) || ""
          }`}
          title={actionError(chipData)}
        >
          <div className="qi-chip_data">
            {typeof labelKey === "function"
              ? labelKey(chipData)
              : displayTableConfigName(variableData, (chipData)[labelKey]) ||
                (chipData)[labelKey]}
          </div>
          {deleteKey !== chipData.id &&
            !readOnly &&
            isDeletable(chipData) &&
            chipData?.name !== "Management Portal" && (
              <span className="qi-chip_cross" onClick={() => onDeleteRequest(chipData)}>
                <svg className={`icon`}>
                  <use href={`${sprite}#cross`}></use>
                </svg>
              </span>
            )}
          {deleteKey === chipData.id && (
            <span className="rounded">
              <span
                onClick={() => onDelete(chipData)}
                className="mx-1 text-red-400 bg-white px-2 rounded-xl clickable"
              >
                Yes
              </span>
              <span
                onClick={onDeleteRequestCancel}
                className="mx-1 text-green-400 bg-white px-2 rounded-xl clickable"
              >
                No
              </span>
            </span>
          )}
        </span>
      )}
    </>
  );
};

interface AddNewChipProps {
  setSearchKey: (key: string) => void;
  onSearch: (key: string) => void;
  addNewTitle?: string;
}

// When a new item is searched
const AddNewChip: React.FC<AddNewChipProps> = ({ setSearchKey, onSearch, addNewTitle }) => {
  return (
    <span className="icon-wrapper add-new" title={addNewTitle}>
      <svg
        className="icon icon-add"
        onClick={() => {
          try {
            setSearchKey("");
            onSearch("");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <use href={`${sprite}#add`}></use>
      </svg>
    </span>
  );
};

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay = 500
): (...args: Parameters<T>) => void {
  let tempVar: NodeJS.Timeout;

  return function(this: any, ...args: Parameters<T>): void {
    clearTimeout(tempVar);
    tempVar = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Add these utility functions at the top of the file
function capitalizeAllFirstLetters(string: string | number): string {
  const originalString = String(string).split(/[_\.]/).join(" ");
  const words = originalString.split(" ");
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

interface VariableDataItem {
  display_name?: string;
  section_name?: string;
  unit_name?: string;
}

const displayTableConfigName = (
  variableData: Record<string, VariableDataItem> | undefined, 
  key: string
): string => {
  if (variableData && variableData[key]?.display_name) {
    return `${variableData[key]?.display_name} ${
      variableData[key]?.section_name
        ? `(${variableData[key]?.section_name}${
            variableData[key]?.unit_name !== "Not applicable"
              ? "- " + variableData[key]?.unit_name
              : ""
          })`
        : ""
    }`;
  } else {
    return capitalizeAllFirstLetters(key);
  }
};

/**
 * This is the Multi select dropdown Component
 *
 * @param {string} label- Accepts a string for label
 * @param {func} onChange- Accepts a callback function to handle onChange event
 * @param {string} className- Accepts custom classNames to be added
 * @param {integer/string} labelKey- Accepts an key to handle the label key
 * @param {array} data- Accepts a data array of objects filtered by query params for searching
 * @param {array} allData- Accepts entire data array of objects to generate the chips selected
 * @param {array} selected- Accepts the selected list of dropdowns
 * @param {func} onSearch- A function to update the simpleSearchKey value
 * @param {string} onSearchPlaceHolder- A string which holds the placeholder for the simple search
 * @param {boolean} readOnly- Accepts a boolean value for the dropdown to be disabled or not
 * @param {func} actionError- Accepts a callback function for handling titles
 * @param {func} getRowClass- Accepts a callback function for handling classnames for each dropdown
 * @param {func} isSelectable- Accepts a callback function for handling whether a particular chip is selectable
 * @param {string} error- Accepts a string to handle error mesasge
 * @param {boolean} multiSelect- Accepts a boolean value to check whether it works as a multi-select or single-select dropdown
 */

interface QIMultiSelectDropDownProps {
  label: string;
  onChange: (selected: Array<string | number>) => void;
  className?: string;
  labelKey?: string | ((data: ChipData) => string);
  data?: ChipData[];
  allData?: ChipData[];
  selected?: Array<string | number>;
  onSearch?: (key: string) => void;
  onSearchPlaceHolder?: string;
  readOnly?: boolean;
  actionError?: (data: ChipData) => string;
  getRowClass?: (data: ChipData & { forSelect?: boolean }) => string;
  isSelectable?: (data: ChipData) => boolean;
  isDeletable?: (data: ChipData) => boolean;
  error?: string;
  multiSelect?: boolean;
  multiSelectWithoutChip?: boolean;
  addNewTitle?: string;
  variableData?: Record<string, VariableDataItem>;
  warningMessage?: string;
  [key: string]: any;
}

export const QIMultiSelectDropDown: React.FC<QIMultiSelectDropDownProps> = ({
  label,
  onChange,
  className = "",
  labelKey = "name",
  data = [],
  allData = [],
  selected = [],
  onSearch,
  onSearchPlaceHolder = "",
  readOnly,
  actionError = () => "",
  getRowClass = () => "",
  isSelectable = () => true,
  isDeletable = () => true,
  error,
  multiSelect = true,
  multiSelectWithoutChip = false,
  addNewTitle = "Add New",
  variableData,
  warningMessage = "",
  ...props
}) => {
  //Maintains the key for delete operation
  const [deleteKey, setDeleteKey] = useState<string | number | null>(null);

  //Maintains the key for search operation
  const [searchKey, setSearchKey] = useState<string>("");

  //Maintains the list of multiselect chips selected
  const [chipDataSelected, setChipDataSelected] = useState<ChipData[]>([]);

  //Clear the chip selected list on unmount
  useEffect(() => {
    return () => {
      setChipDataSelected(allData.filter(item => selected.includes(item.id)));
    };
  }, []);

  //When deleting a chip if confirmed
  const onClose = (chipData: ChipData): void => {
    let tempSelected = selected.filter((item) => item !== chipData.id);
    setDeleteKey("");
    onChange(tempSelected);
  };

  //When adding a new data from the list
  const addNew = (chipData: ChipData): void => {
    setSearchKey("");
    if (!selected.find((datum) => datum === chipData.id)) {
      const tempSelected = [...selected, chipData.id];
      onChange(tempSelected);
    }
    setChipDataSelected((prevData) => [...prevData, chipData]);
  };

  //When wanting to delete a chip
  const onDeleteRequest = (data: ChipData): void => {
    setDeleteKey(data.id);
  };

  //When cancelling the request to delete a chip
  const onDeleteRequestCancel = (): void => {
    setDeleteKey(null);
  };

  const callApi = useMemo(() => {
    return onSearch
      ? debounce((value: string) => {
          onSearch(value);
        })
      : () => {};
  }, [onSearch]);

  const handleSearch = (value: string): void => {
    setSearchKey(value);
    callApi(value);
  };

  return (
    <div
      className={`qi-multiselect-dropdown qi-form-element ${
        multiSelectWithoutChip && "no-outline"
      } ${error ? "error" : ""} ${readOnly ? "disabled" : ""} ${className || ""}`}
    >
      <label className="qi-multiselect-dropdown_label" data-testid="input-label">
        {label}
      </label>

      <div className="qi-multiselect-dropdown_wrapper">
        <div className="flex">
          {selected?.length > 0 && !multiSelectWithoutChip && (
            <div className="qi-multiselect-dropdown_chip-container device-chip">
              {(allData || data) &&
                (allData.length > 0 || data.length > 0) &&
                selected.map((selectedItem, index) => (
                  <QIChip
                    allData={chipDataSelected?.find((item) => selectedItem === item.id)}
                    data={data?.find((item) => selectedItem === item.id)}
                    labelKey={labelKey}
                    key={index}
                    deleteKey={deleteKey}
                    onDelete={onClose}
                    onDeleteRequest={onDeleteRequest}
                    onDeleteRequestCancel={onDeleteRequestCancel}
                    readOnly={readOnly}
                    isSelectable={isSelectable}
                    isDeletable={isDeletable}
                    actionError={actionError}
                    getRowClass={getRowClass}
                    variableData={variableData}
                  />
                ))}
            </div>
          )}
          <div className="qi-multiselect-dropdown_wrapper new-device-chip">
            {!readOnly && multiSelect && (
              <QIDropdown
                toggleComponent={
                  <AddNewChip
                    setSearchKey={setSearchKey}
                    onSearch={onSearch || (() => {})}
                    addNewTitle={addNewTitle}
                  />
                }
              >
                {onSearch && (
                  <form
                    className="chip-search"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <QIInput
                      value={searchKey}
                      placeholder={onSearchPlaceHolder}
                      className="qi-input_text chip-search_text"
                      onChange={(value: string) => handleSearch(value)}
                      icon={{ src: `search`, className: "search-icon" }}
                      focus={true}
                    />
                  </form>
                )}

                <Scrollbars autoHeight autoHeightMax="150px">
                  <ul className="available-in-list backends">
                    {(!data || data.length == 0) && (
                      <li className="no-item-availlable">No Item Available.</li>
                    )}
                    {data?.map((datum, index) => (
                      <li
                        className={`available-in-list_item ${
                          selected?.find((record) => datum.id === record) ? "active" : ""
                        } ${getRowClass({ forSelect: true, ...datum }) || ""}`}
                        onClick={!isSelectable(datum) ? () => {} : () => addNew(datum)}
                        title={`${actionError(datum)}`}
                        key={index}
                      >
                        {typeof labelKey === "function"
                          ? labelKey(datum)
                          : displayTableConfigName(variableData, datum[labelKey]) ||
                            datum[labelKey]}
                      </li>
                    ))}
                  </ul>
                </Scrollbars>
              </QIDropdown>
            )}
          </div>
        </div>

        {!readOnly && error && (
          <div className="qi-multiselect-dropdown_error">
            <span className="icon-wrapper">
              <svg className="icon">
                <use href={`${sprite}#info`}></use>
              </svg>
            </span>
            <p className="qi-multiselect-dropdown_error_message">{error}</p>
          </div>
        )}
        {warningMessage.length > 0 && (
          <div className="qi-input_warning ">
            <p className="qi-input_warning_message">{warningMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};
