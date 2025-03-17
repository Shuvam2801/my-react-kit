export * from './components';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QIDesignSystems } from './QIDesignSystems';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<QIDesignSystems />);
