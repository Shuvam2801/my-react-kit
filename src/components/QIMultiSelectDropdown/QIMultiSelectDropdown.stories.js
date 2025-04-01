import React, { useState } from 'react';
import { QIMultiSelectDropDown } from './QIMultiSelectDropdown';
import '../../styles/tailwindcss/QIMultiSelectDropdown.scss';


export default {
  title: 'Components/QIMultiSelectDropdown',
  component: QIMultiSelectDropDown,
  parameters: {
    componentSubtitle: 'A dropdown component that allows selecting multiple items',
  },
  argTypes: {
    label: { control: 'text' },
    data: { control: 'object' },
    allData: { control: 'object' },
    selected: { control: 'object' },
    onChange: { action: 'onChange' },
    onSearch: { action: 'onSearch' },
    onSearchPlaceHolder: { control: 'text' },
    readOnly: { control: 'boolean' },
    error: { control: 'text' },
    multiSelect: { control: 'boolean' },
    addNewTitle: { control: 'text' },
    
  },
};

const mockData = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
  { id: '4', name: 'Option 4' },
  { id: '5', name: 'Option 5' },
];

// Basic example with pre-selected items
export const Basic = () => {
  const [selected, setSelected] = useState(['1', '2']);
  
  return (
    <QIMultiSelectDropDown
      label="Basic Multi-Select"
      data={mockData}
      allData={mockData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
    />
  );
};

// Example with search functionality
export const WithSearch = () => {
  const [selected, setSelected] = useState(['1']);
  const [filteredData, setFilteredData] = useState(mockData);
  
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(mockData);
      return;
    }
    
    const filtered = mockData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  
  return (
    <QIMultiSelectDropDown
      label="Searchable Multi-Select"
      data={filteredData}
      allData={mockData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      onSearch={handleSearch}
      onSearchPlaceHolder="Search options..."
    />
  );
};

// Example with custom label rendering
export const CustomLabelKey = () => {
  const [selected, setSelected] = useState(['1']);
  const customData = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
    { id: '3', firstName: 'Bob', lastName: 'Johnson' },
  ];
  
  const customLabelKey = (data) => `${data.firstName} ${data.lastName}`;
  
  return (
    <QIMultiSelectDropDown
      label="Custom Label Function"
      data={customData}
      allData={customData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      labelKey={customLabelKey}
    />
  );
};

// Example with error state
export const WithError = () => {
  const [selected, setSelected] = useState([]);
  
  return (
    <QIMultiSelectDropDown
      label="Multi-Select with Error"
      data={mockData}
      allData={mockData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      error="Please select at least one option"
    />
  );
};


// Example in read-only mode
export const ReadOnly = () => {
  const [selected, setSelected] = useState(['1', '3']);
  
  return (
    <QIMultiSelectDropDown
      label="Read-Only Multi-Select"
      data={mockData}
      allData={mockData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      readOnly={true}
    />
  );
};

// Example with custom row classes
export const CustomRowClasses = () => {
  const [selected, setSelected] = useState(['1']);
  const statusData = [
    { id: '1', name: 'Active', status: 'active' },
    { id: '2', name: 'Pending', status: 'pending' },
    { id: '3', name: 'Suspended', status: 'suspended' },
    { id: '4', name: 'Deleted', status: 'deleted' },
  ];
  
  const getRowClass = (data) => {
    if (data.forSelect) {
      return `status-${data.status}`;
    }
    return `chip-${data.status}`;
  };
  
  return (
    <div>
      <style>
        {`
          .status-active, .chip-active { color: green; }
          .status-pending, .chip-pending { color: orange; }
          .status-suspended, .chip-suspended { color: red; }
          .status-deleted, .chip-deleted { color: gray; }
        `}
      </style>
      <QIMultiSelectDropDown
        label="Custom Row Classes"
        data={statusData}
        allData={statusData}
        selected={selected}
        onChange={(newSelected) => setSelected(newSelected)}
        getRowClass={getRowClass}
      />
    </div>
  );
};

// Example with selectable/non-selectable items
export const SelectableItems = () => {
  const [selected, setSelected] = useState(['1']);
  const selectableData = [
    { id: '1', name: 'Option 1', selectable: true },
    { id: '2', name: 'Option 2', selectable: true },
    { id: '3', name: 'Option 3 (Non-selectable)', selectable: false },
    { id: '4', name: 'Option 4', selectable: true },
  ];
  
  const isSelectable = (data) => data.selectable;
  
  return (
    <QIMultiSelectDropDown
      label="Selectable Items"
      data={selectableData}
      allData={selectableData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      isSelectable={isSelectable}
    />
  );
};


// Example with variable data for display names
export const WithVariableData = () => {
  const [selected, setSelected] = useState(['temp_sensor', 'humidity']);
  
  const sensorData = [
    { id: 'temp_sensor', name: 'temp_sensor' },
    { id: 'humidity', name: 'humidity' },
    { id: 'pressure', name: 'pressure' },
  ];
  
  const variableData = {
    'temp_sensor': {
      display_name: 'Temperature',
      section_name: 'Environmental',
      unit_name: '°C'
    },
    'humidity': {
      display_name: 'Humidity',
      section_name: 'Environmental',
      unit_name: '%'
    },
    'pressure': {
      display_name: 'Pressure',
      section_name: 'Environmental',
      unit_name: 'hPa'
    }
  };
  
  return (
    <QIMultiSelectDropDown
      label="Sensors"
      data={sensorData}
      allData={sensorData}
      selected={selected}
      onChange={(newSelected) => setSelected(newSelected)}
      variableData={variableData}
    />
  );
}; 