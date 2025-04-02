import React from 'react';
import { QIList } from './QIList';
import '../../styles/tailwindcss/QIList.scss';

export default {
  title: 'Components/QIList',
  component: QIList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    striped: { control: 'boolean' },
    detailedView: { control: 'boolean' },
    customScrollbar: { control: 'boolean' },
    hover: { control: 'boolean' },
    listHeaderOptions: {
      control: { type: 'select', options: ['default', 'hidden'] },
    },
    responsive: {
      control: { type: 'select', options: [true, false, 'sm', 'md', 'lg', 'xl'] },
    },
    scrollbarHeight: { control: 'text' },
    maxHeight: { control: 'text' },
  },
};

// Sample data for our stories
const sampleData = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', status: 'active', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'inactive', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', status: 'active', role: 'Editor' },
  { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com', status: 'pending', role: 'Viewer' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie.wilson@example.com', status: 'active', role: 'Manager' },
];

// Custom component for status
const StatusComponent = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'inactive':
        return 'bg-red-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center">
      <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(data.status)}`}></span>
      <span>{data.status}</span>
    </div>
  );
};

// Template for basic list
const Template = (args) => <QIList {...args} />;

// Basic list story
export const Basic = Template.bind({});
Basic.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { label: 'Email', key: 'email', width: '40%' },
    { label: 'Role', key: 'role', width: '30%' },
  ],
  data: sampleData,
  handler: {
    rowHandler: (item) => console.log('Row clicked:', item),
  },
};

// List with checkboxes story - Updated to be interactive
export const WithCheckboxes = () => {
  const [selectedIds, setSelectedIds] = React.useState(['1', '3']);
  
  const handleCheckboxChange = (item) => {
    if (selectedIds.includes(item.id)) {
      setSelectedIds(selectedIds.filter(id => id !== item.id));
    } else {
      setSelectedIds([...selectedIds, item.id]);
    }
    console.log('Checkbox clicked:', item);
  };
  
  const handleSelectAll = () => {
    if (selectedIds.length === sampleData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sampleData.map(item => item.id));
    }
    console.log('Select all clicked');
  };
  
  return (
    <QIList
      columns={[
        { label: '', key: 'checkbox', checkbox: true, statusKey: 'id', width: '5%' },
        { label: 'Name', key: 'name', width: '25%' },
        { label: 'Email', key: 'email', width: '40%' },
        { label: 'Role', key: 'role', width: '30%' },
      ]}
      data={sampleData}
      status={selectedIds}
      handler={{
        allSelectHandler: handleSelectAll,
        checkboxHandler: handleCheckboxChange,
        rowHandler: (item) => console.log('Row clicked:', item),
      }}
    />
  );
};

// List with custom component
export const WithCustomComponent = Template.bind({});
WithCustomComponent.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { label: 'Email', key: 'email', width: '40%' },
    { label: 'Status', key: 'status', type: 'component', component: StatusComponent, width: '30%' },
  ],
  data: sampleData,
  handler: {
    rowHandler: (item) => console.log('Row clicked:', item),
  },
};

// List with detailed view
export const WithDetailedView = Template.bind({});
WithDetailedView.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { label: 'Email', key: 'email', width: '40%' },
    { label: 'Status', key: 'status', width: '30%' },
  ],
  data: sampleData,
  detailedView: true,
  detailedData: (item) => (
    <div className="p-4 bg-gray-100">
      <h3 className="font-bold">Details for {item.name}</h3>
      <p>Email: {item.email}</p>
      <p>Role: {item.role}</p>
      <p>Status: {item.status}</p>
    </div>
  ),
  handler: {
    rowHandler: (item) => console.log('Row clicked:', item),
  },
};

// Empty list story
export const EmptyList = Template.bind({});
EmptyList.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { label: 'Email', key: 'email', width: '40%' },
    { label: 'Role', key: 'role', width: '30%' },
  ],
  data: [],
  handler: {},
};

// With highlighting
export const WithHighlighting = () => {
  const [highlightedId, setHighlightedId] = React.useState('2');
  
  return (
    <QIList
      columns={[
        { label: 'Name', key: 'name', width: '30%' },
        { label: 'Email', key: 'email', width: '40%' },
        { label: 'Role', key: 'role', width: '30%' },
      ]}
      data={sampleData}
      highlight={highlightedId}
      setHighlight={setHighlightedId}
      handler={{
        rowHandler: (item) => console.log('Row clicked:', item),
      }}
    />
  );
};

// With nested values
export const WithNestedValues = Template.bind({});
WithNestedValues.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { 
      label: 'Full Info', 
      key: 'fullInfo', 
      nestedValue: true, 
      getNestedValue: (item) => `${item.name} (${item.role}) - ${item.status}`,
      width: '70%'
    },
  ],
  data: sampleData,
  handler: {
    rowHandler: (item) => console.log('Row clicked:', item),
  },
};

// With custom height
export const WithCustomHeight = Template.bind({});
WithCustomHeight.args = {
  columns: [
    { label: 'Name', key: 'name', width: '30%' },
    { label: 'Email', key: 'email', width: '40%' },
    { label: 'Role', key: 'role', width: '30%' },
  ],
  data: [...sampleData, ...sampleData, ...sampleData], // More data to show scrolling
  scrollbarHeight: '200px',
  handler: {
    rowHandler: (item) => console.log('Row clicked:', item),
  },
};