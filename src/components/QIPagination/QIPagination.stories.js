import React, { useState } from 'react';
import { QIPagination } from './QIPagination';
//import { QIPagination } from '../index';
import "../../styles/tailwindcss/index.scss";


export default {
  title: 'Components/QIPagination',
  component: QIPagination,
  parameters: {
    componentSubtitle: 'Pagination component for navigating through pages',
  },
  argTypes: {
    pageCount: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    activePage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page',
    },
    onPageChange: { action: 'page changed' },
  },
};



// Interactive pagination with state
export const Interactive = () => {
  const [activePage, setActivePage] = useState(1);
  return (
    <QIPagination
      pageCount={10}
      activePage={activePage}
      onPageChange={(page) => setActivePage(page)}
    />
  );
};

// Pagination with many pages
export const ManyPages = () => {
  const [activePage, setActivePage] = useState(5);
  return (
    <QIPagination
      pageCount={50}
      activePage={activePage}
      onPageChange={(page) => setActivePage(page)}
    />
  );
};

// Pagination with few pages
export const FewPages = () => {
  const [activePage, setActivePage] = useState(1);
  return (
    <QIPagination
      pageCount={3}
      activePage={activePage}
      onPageChange={(page) => setActivePage(page)}
    />
  );
};

// Pagination at first page
export const FirstPage = () => (
  <QIPagination
    pageCount={10}
    activePage={1}
    onPageChange={() => {}}
  />
);

// Pagination at last page
export const LastPage = () => (
  <QIPagination
    pageCount={10}
    activePage={10}
    onPageChange={() => {}}
  />
);

// Pagination with custom styling
export const CustomStyling = () => {
  const [activePage, setActivePage] = useState(3);
  return (
    <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
      <QIPagination
        pageCount={10}
        activePage={activePage}
        onPageChange={(page) => setActivePage(page)}
      />
    </div>
  );
};

// Pagination with all optional props
export const WithAllProps = () => {
  const [activePage, setActivePage] = useState(3);
  const [dockAlign, setDockAlign] = useState('cross');
  const [showDetails, setShowDetails] = useState(true);
  
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p>Current Page: {activePage}</p>
        <p>Dock Align: {dockAlign}</p>
        <p>Show Details: {showDetails ? 'Yes' : 'No'}</p>
      </div>
      <QIPagination
        pageCount={10}
        activePage={activePage}
        onPageChange={(page) => setActivePage(page)}
        setDockAlign={setDockAlign}
        setShowDetails={setShowDetails}
        removeLayerOnClose={() => console.log('Layer removed')}
        setDeviceId={() => console.log('Device ID set to null')}
        setHighlight={() => console.log('Highlight set to null')}
      />
    </div>
  );
}; 