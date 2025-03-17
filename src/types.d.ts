declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '@qinvent/react-kit/src/components/QIButton' {
    export const QIButton: React.FC<{
      className?: string;
      type?: 'button' | 'submit' | 'reset';
      disabled?: boolean;
      icon?: {
        src?: string;
        className?: string;
        wrapperClass?: string;
      };
      onClick?: () => void;
      children?: React.ReactNode;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIInput' {
    export const QIInput: React.FC<{
      type?: 'text' | 'email' | 'number';
      disabled?: boolean;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      className?: string;
      iconAlign?: 'left' | 'right';
      value?: string;
      onChange: (value: string) => void;
      placeholder?: string;
      icon?: {
        src?: string;
        className?: string;
      };
      focus?: boolean;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QISwitch' {
    export const QISwitch: React.FC<{
      checked: boolean;
      onChange: (checked: boolean) => void;
      label?: string;
      className?: string;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QISelect' {
    export const QISelect: React.FC<{
      label: string;
      value?: string;
      className?: string;
      error?: string;
      onChange: (value: string) => void;
      readOnly?: boolean;
      children: React.ReactNode;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIRadioButton' {
    export const QIRadioButton: React.FC<{
      radioObjects: Array<{
        value: string;
        label: string;
        checked: boolean;
        onChange: () => void;
      }>;
      name?: string;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QITracksListCard' {
    export const QITracksListCard: React.FC<{
      tracks: Array<any>; // Define a more specific type if possible
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QISpinner' {
    export const QISpinner: React.FC<{
      type?: 'border' | 'grow';
      size?: 'sm' | 'md' | 'lg' | 'xl';
      className?: string;
      show?: boolean;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QISlideSelect' {
    export const QISlideSelect: React.FC<{
      pagination: {
        perPage: number;
        onPerPageChange: (value: number) => void;
        onPageChange: (page: number) => void;
      };
      defaultVal?: number;
      range?: number;
      maxCap?: number;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIDatePicker' {
    export const QIDatePicker: React.FC<{
      selectedRange: {
        startDate: moment.Moment;
        endDate: moment.Moment;
      };
      setSelectedRange: (range: {
        startDate: moment.Moment;
        endDate: moment.Moment;
      }) => void;
      resetCount: number;
      setResetCount: (count: number) => void;
      label?: string;
      className?: string;
      openCalendar?: string;
      warningMessage?: string;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIModal' {
    export const QIModal: React.FC<{
      show: boolean;
      onHide: () => void;
      children: React.ReactNode;
      backdrop?: boolean;
      className?: string;
      size?: string;
      backdropView?: boolean;
    }>;
  
    export const QIModalHeader: React.FC<{
      children: React.ReactNode;
      onHide: () => void;
      closeButton?: boolean;
    }>;
  
    export const QIModalBody: React.FC<{
      children: React.ReactNode;
    }>;
  
    export const QIModalFooter: React.FC<{
      children: React.ReactNode;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIFileUploader' {
    export const QIFileUploader: React.FC<{
      label: string;
      value?: any; // Define a more specific type if possible
      error?: string;
      disabled?: boolean;
      readOnly?: boolean;
      className?: string;
      onChange: (files: FileList | null) => void;
      placeholder?: string;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIPagination' {
    export const QIPagination: React.FC<{
      pageCount: number;
      onPageChange: (page: number) => void;
      activePage: number;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QICheckBox' {
    export const QICheckBox: React.FC<{
      label: string;
      checked?: boolean;
      value?: string;
      onChange: (value: string) => void;
      className?: string;
      readOnly?: boolean;
      error?: string;
      id?: string;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIDropdown' {
    export const QIDropdown: React.FC<{
      toggleComponent: React.ReactNode;
      children: React.ReactNode;
      className?: string;
      onHide?: () => void;
    }>;
  }
  
  declare module '@qinvent/react-kit/src/components/QIMultiSelectDropdown' {
    export const QIMultiSelectDropDown: React.FC<{
      label: string;
      data: Array<any>; // Define a more specific type if possible
      allData: Array<any>; // Define a more specific type if possible
      selected: Array<string>;
      onChange: (selected: Array<string>) => void;
      error?: string;
      readOnly?: boolean;
    }>;
  }
  
  
  