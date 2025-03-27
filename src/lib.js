// This is the main entry point for the library
import { QIButton } from './components/QIButton/QIButton';
import { QIInput } from './components/QIInput/QIInput';
import { QICheckBox } from './components/QICheckBox/QICheckBox';
import { QIRadioButton } from './components/QIRadioButton/QIRadioButton';
import { QIModal, QIModalBody, QIModalHeader, QIModalFooter } from './components/QIModal/QIModal';
import { QIFileUploader } from './components/QIFileUploader/QIFileUploader';
import { QISelect } from './components/QISelect/QISelect';
import { QISlideSelect } from './components/QISlideSelect/QISlideSelect';
import { QISpinner } from './components/QISpinner/QISpinner';
import { QITable } from './components/QITable/QITable';
import { QISwitch } from './components/QISwitch/QISwitch';
import { QITracksListCard } from './components/QITrackListCard/QITrackListCard';
import { QIPagination } from './components/QIPagination/QIPagination';
import { QIMultiSelectDropDown } from './components/QIMultiSelectDropdown/QIMultiSelectDropdown';
import { QIDropdown } from './components/QIDropdown/QIDropdown';
// Import other components as needed

// Export individual components
export {
  QIButton,
  QICheckBox,
  QIDropdown,
  QIInput,
  QIModal, QIModalBody, QIModalHeader, QIModalFooter,
  QIFileUploader,
  QIPagination,
  QISlideSelect,
  QIMultiSelectDropDown,
  QIRadioButton,
  QISelect,
  QISpinner,
  QISwitch,
  QITable,
  QITracksListCard,
  
};

// Export styles
import './styles/tailwindcss/index.scss';
