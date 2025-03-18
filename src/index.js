export * from './components';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QIDesignSystems } from './QIDesignSystems';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<QIDesignSystems />);

// import { QIButton } from './components/QIButton';
// import { QICheckBox } from './components/QICheckBox';
// import { QIRadioButton } from './components/QIRadioButton';
// // Import other components as needed

// // Export individual components
// export { 
//   QIButton,
//   QICheckBox,
//   QIRadioButton,
//   // Export other components
// };

// // Do NOT export QIDesignSystems as default
// // If you need to export it, do it explicitly
// export { QIDesignSystems } from './QIDesignSystems';
