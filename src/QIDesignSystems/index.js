import React, { useState, useEffect } from 'react';
import { QIMultiSelectDropDown, QICheckBox, QIButton, QIInput, QISwitch, QISelect, QIRadioButton, QITracksListCard, QISpinner, QISlideSelect, QIModal, QIModalBody, QIModalHeader, QIModalFooter, QIFileUploader, QIPagination } from "../components";

import "../styles/tailwindcss/index.scss";
import "./style.scss";
import sprite from "../assets/icons.svg";
import { QITable } from '../components/QITable/QITable';
import { tableData } from "../data/tableData.js";
import moment from 'moment';
import { CopyBlock, dracula } from "react-code-blocks";
import { ButtonText, CheckBoxText, FileUploaderText, InputText, ListCardText, ModalText, MultiSelectText, PaginationText, RadioButtonText, SelectText, SliderText, SpinnerText, SwitchText, TableText } from './helper/codeBlock.js';
import inputProp from "../assets/input_prop.png";
import switchPropImg from "../assets/switch.png";
import { qiswitchPropImg, radioPropImg, slidePaginationField, slideProp, tripDataImg } from '../assets/index.ts';

export const QIDesignSystems = () => {
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  
  
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const radioObject = [{
    value: 1,
    label: 'Option 1'
  },
  {
    value: 2,
    label: 'Option 2'
  },
  ]

  const pagination = { page, perPage, onPageChange: setPage, onPerPageChange: setPerPage };


  const tripData = {
    mode: "TRIP",
    data: {
      status: "Active",
      start_time: "2025-01-01T12:30:00Z", // ISO date format
      start_position: {
        address: {
          city: "CityName",
          region: "Region",
          country: "Country"
        },
        lat: 20.123,
        lng: 85.456
      },
      end_time: "2025-01-01T14:20:00Z", // ISO date format
      end_position: {
        address: {
          city: "DestinationCity",
          region: "DestinationRegion",
          country: "Country"
        },
        lat: 20.456,
        lng: 85.789
      },
      max_speed: 1000,
      avg_speed: 90,
      gps_distance: 30000,
      duration: 6600000, // in milliseconds (7 hours 50 minutes)
      activityDetailsMode: ["TRIP"]
    }
  }

  const headers = [
    {
      label: "Name",
      key: "name",
      className: "name",
    },
    {
      label: "Report Type",
      id: 2,
      className: "report-type",
      type: "component",
      component: ({ data }) => {
        //Underscore is replaced by space and first letter of each word is made in upper case
        let name = data?.report_type?.split("_").map((word) => {
          // Display Activity instead of Activities
          return word === "Activities"
            ? "Activity"
            : word.charAt(0).toUpperCase() + word.substring(1, word.length) + " ";
        });

        name = name?.map((s) => s?.trim())?.join(" ");

        return (
          <span
            title={`${name} ${data?.report_type?.toLowerCase() === "trackpoint"
              ? "(" + data?.report_configuration_name + ")"
              : ""
              }`}
          >
            {`${name} ${data?.report_type?.toLowerCase() === "trackpoint"
              ? "(" + data?.report_configuration_name + ")"
              : ""
              }`}
          </span>
        );
      },
    },
    {
      label: "Sub Type",
      className: "report-sub-type",
      type: "component",
      component: ({ data }) => {
        const subType = data?.report_sub_type?.split("_").map((word) => {
          return word.charAt(0).toUpperCase() + word.substring(1, word.length) + " ";
        });

        const summaryInterval = data?.summary_interval?.split("_").map((word) => {
          // Display NA instead of na
          return word === "na"
            ? "NA"
            : word.charAt(0).toUpperCase() + word.substring(1, word.length) + " ";
        });

        return (
          <span title={`${subType} ${summaryInterval ? "(" + summaryInterval + ")" : ""}`}>
            {`${subType} ${summaryInterval ? "(" + summaryInterval + ")" : ""}`}
          </span>
        );
      },
    },
    {
      label: "Selected Criteria",
      id: 4,
      className: "selection-criteria",
      type: "component",
      component: ({ data }) => {
        return (
          <span
            title={`${data?.selection_criteria} ${data?.asset_type ? "(" + data?.asset_type + ")" : ""
              }`}
          >
            {`${data?.selection_criteria} ${data?.asset_type ? "(" + data?.asset_type + ")" : ""}`}
          </span>
        );
      },
    },
    {
      label: "Group by Asset",
      key: "group_by_asset",
      nestedValue: true,
      getNestedValue: ({ group_by_asset }) => (
        <>
          22
        </>
      ),
      className: "w-25",
    },
    {
      label: "Download",
      id: 10,
      className: "text-center",
      nestedValue: true,
      getNestedValue: ({ report_file_url, status }) => {
        return <>1</>
      },
    },
  ];

  const dropdownData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
    
  ];

  const handleMultiSelectChange = (selected) => {
    setSelectedItems(selected);
  };

  const sideBarItems = [
    'Button', 'Checkbox', 'Input', 'Select', 'Switch', 'Radio Button', 'List Card', 'Spinner', 'Slider', 'Table', 'Modal', 'File Uploader', 'Pagination','Multi-select Dropdown'
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderSideBarItems = sideBarItems?.map(item => {
    const itemId = item.toLowerCase().replace(/\s+/g, '-');
    return (
      <li key={item} className="component-list_item">
        <a 
          href={`#${itemId}`}
          className={activeSection === itemId ? 'active' : ''}
          onClick={() => setActiveSection(itemId)}
        >
          {item}
        </a>
      </li>
    )
  })

  return (
    <>
      <h1 className="page-title">React Kit Components</h1>

      <div className='content-header'>
        <h1 style={{ fontSize: '16px', fontWeight: 'normal' }}>React Kit Documentation</h1>
        <p>Welcome to the documentation page. Here you'll find information on how to use the components.</p>
      </div>

      <div className="app-container">
        <nav className="sidebar">
          <h2 className="side-sub-title">QI Components</h2>

          <ul className="component-list">
            {renderSideBarItems}
          </ul>
        </nav>

        <main className="content">

          <section id='button' className="element-item">
            <h2 className="sub-title">Button</h2>

            <QIButton
              type="button"
              size="md"
              className="qi-btn primary"
              variant="link"
              disabled={false}
              icon={{ src: `${sprite}#cross`, height: '20px', width: '20px', align: 'right' }}
              loading={true}
            >
              Login
            </QIButton>

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <br />
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td><code>string</code></td><td>No</td><td><code>"button"</code></td><td>Defines the button type (e.g., <code>"button"</code>, <code>"submit"</code>, <code>"reset"</code>).</td></tr><tr><td><code>size</code></td><td><code>string</code></td><td>No</td><td><code>"md"</code></td><td>Controls the button size. Options may include <code>"sm"</code>, <code>"md"</code>, <code>"lg"</code> for small, medium, and large.</td></tr><tr><td><code>className</code></td><td><code>string</code></td><td>No</td><td><code>""</code></td><td>Custom CSS classes for additional styling.</td></tr><tr><td><code>variant</code></td><td><code>string</code></td><td>No</td><td><code>"default"</code></td><td>Defines the button style variant, such as <code>"primary"</code>, <code>"secondary"</code>, <code>"link"</code>.</td></tr><tr><td><code>disabled</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Disables the button if set to <code>true</code>, preventing clicks and greying out the style.</td></tr><tr><td><code>icon</code></td><td><code>ReactNode</code></td><td>No</td><td><code>null</code></td><td>Allows an icon component or JSX element to be displayed inside the button.</td></tr><tr><td><code>loading</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>Shows a loading spinner or indicator when set to <code>true</code>, typically disabling interaction.</td></tr><tr><td><code>children</code></td><td><code>ReactNode</code></td><td>Yes</td><td></td><td>Button label or content, such as <code>"Login"</code>.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={ButtonText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='checkbox' className="element-item">
            <h2 className="sub-title">Checkbox</h2>

            <QICheckBox 
              label="I agree to the terms"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <br />
                
                <ul>
                  <li>The <strong>QICheckBox</strong> component renders a custom checkbox UI element.</li>
                  <li>This component represents a selectable option that can be checked or unchecked.</li>
                  <li>It provides interactive functionality for selecting or deselecting an option.</li>
                </ul>
              
            </pre>

            <CopyBlock
              language={"jsx"}
              text={CheckBoxText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='input' className="element-item">
            <h2 className="sub-title">Input</h2>

            <QIInput 
              value={inputValue}
              onChange={setInputValue}
              placeholder="Type something..."
            />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>type</code></td><td><code>string</code></td><td>No</td><td><code>"text"</code></td><td>Specifies the type of input, e.g., <code>"text"</code>, <code>"password"</code>, <code>"email"</code>.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>Yes</td><td></td><td>Sets the current value of the input. This should be a controlled value.</td></tr><tr><td><code>onChange</code></td><td><code>function</code></td><td>Yes</td><td></td><td>Function to handle changes to the input value.</td></tr><tr><td><code>placeholder</code></td><td><code>string</code></td><td>No</td><td><code>""</code></td><td>Placeholder text displayed when the input is empty.</td></tr><tr><td><code>label</code></td><td><code>string</code></td><td>No</td><td><code>""</code></td><td>A label for the input, displayed above or beside the input field.</td></tr><tr><td><code>disabled</code></td><td><code>boolean</code></td><td>No</td><td><code>false</code></td><td>If <code>true</code>, disables the input field.</td></tr><tr><td><code>maxLength</code></td><td><code>number</code></td><td>No</td><td><code>null</code></td><td>Limits the maximum number of characters that can be entered.</td></tr><tr><td><code>style</code></td><td><code>object</code></td><td>No</td><td><code>{}</code></td><td>Inline styles to apply to the input component.</td></tr><tr><td><code>className</code></td><td><code>string</code></td><td>No</td><td><code>""</code></td><td>Custom class name(s) for additional styling.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={InputText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id="select" className="element-item">
            <h2 className="sub-title">Select</h2>

            <QISelect label={"Dropdown"} value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </QISelect>

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>label</code></td><td><code>string</code></td><td>Yes</td><td></td><td>Specifies a label for the select input, displayed above or next to the dropdown.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>Yes</td><td></td><td>Sets the selected value of the dropdown. This should be a controlled value.</td></tr><tr><td><code>onChange</code></td><td><code>function</code></td><td>Yes</td><td></td><td>Event handler function to capture changes to the dropdown selection.</td></tr><tr><td><code>children</code></td><td><code>ReactNode</code></td><td>Yes</td><td></td><td>Contains <code>&lt;option&gt;</code> elements that represent selectable items in the dropdown.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={SelectText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='switch' className="element-item">
            <h2 className="sub-title">Switch</h2>

            <QISwitch
              label={switchValue ? "Enabled" : "Disabled"}
              className=""
              value={switchValue}
              onChange={() => setSwitchValue(!switchValue)}
            />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Prop Name</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>No</td>
                    <td><code>""</code></td>
                    <td>The label displayed next to the switch, providing context for the switch's purpose.</td>
                  </tr>
                  <tr>
                    <td><code>className</code></td>
                    <td><code>string</code></td>
                    <td>No</td>
                    <td><code>""</code></td>
                    <td>CSS class name for applying custom styles to the switch.</td>
                  </tr>
                  <tr>
                    <td><code>value</code></td>
                    <td><code>boolean</code></td>
                    <td>Yes</td>
                    <td><code>false</code></td>
                    <td>The current state of the switch: <code>true</code> for "On" or <code>false</code> for "Off".</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>function</code></td>
                    <td>Yes</td>
                    <td></td>
                    <td>Callback function triggered when the switch value changes, receiving the new state.</td>
                  </tr>
                </tbody>
              </table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={SwitchText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id="radio-button" className="element-item">
            <h2 className="sub-title">Radio Button</h2>

            <QIRadioButton radioObjects={radioObject} />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>radioObjects</code></td><td><code>array</code></td><td>Yes</td><td></td><td>An array of objects representing each radio button option. Each object should have <code>label</code> and <code>value</code> properties.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={RadioButtonText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id="list-card" className="element-item">
            <h2 className="sub-title">List Card</h2>

            <QITracksListCard key={1} data={tripData} />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td><code>key</code></td><td><code>number</code></td><td>Yes</td><td>Unique key identifier for each card (required when rendering lists in React).</td></tr><tr><td><code>data</code></td><td><code>object</code></td><td>Yes</td><td>Contains trip details, structured as shown in <code>tripData</code>, to display in the card.</td></tr></tbody></table>

              <br />

              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td><code>key</code></td><td><code>number</code></td><td>Yes</td><td>Unique key identifier for each card (required when rendering lists in React).</td></tr><tr><td><code>data</code></td><td><code>object</code></td><td>Yes</td><td>Contains trip details, structured as shown in <code>tripData</code>, to display in the card.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={ListCardText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='spinner' className="element-item">
            <h2 className="sub-title">Spinner</h2>

            <QISpinner />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={SpinnerText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='slider' className="element-item">
            <h2 className="sub-title">Slider</h2>

            <QISlideSelect pagination={pagination} />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <br />
              <h2>Prop</h2>
              <table><thead><tr><th>Prop Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td><code>pagination</code></td><td><code>object</code></td><td>Yes</td><td>An object containing the pagination details, including current page, items per page, and handlers for updating them.</td></tr></tbody></table>
              <br />
              <h2>Pagination Fields</h2>
              <table><thead><tr><th>Field Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td><code>page</code></td><td><code>number</code></td><td>The current page number to display in the slide view.</td></tr><tr><td><code>perPage</code></td><td><code>number</code></td><td>The number of items to display per page.</td></tr><tr><td><code>onPageChange</code></td><td><code>function</code></td><td>Callback function triggered when the page changes, receiving the new page number as an argument.</td></tr><tr><td><code>onPerPageChange</code></td><td><code>function</code></td><td>Callback function triggered when the items per page value changes, receiving the new perPage value.</td></tr></tbody></table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={SliderText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='table' className="element-item">
            <h2 className="sub-title">Table</h2>

            <QITable headers={headers} data={tableData || []} />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={TableText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>
          
          <section id='modal' className="element-item">
            <h2 className="sub-title">Modal</h2>

            <QIButton
              type="button"
              size="md"
              className="qi-btn primary"
              variant="link"
              disabled={false}
              loading={true}
              onClick={() => { setShowModal(true) }}
            >
              Open Modal
            </QIButton>

            <QIModal className="confirm" show={showModal} size="small">
              <QIModalBody>
                <h2 className="font-bold mb-3">Confirmation Alert</h2>
                <p>This is a dummy modal</p>
              </QIModalBody>
              <QIModalFooter>
                <QIButton
                  onClick={() => { setShowModal(false) }}
                  className="qi-btn secondary md"
                  variant="secondary"
                  size="sm"
                >
                  No
                </QIButton>
                <QIButton
                  onClick={() => { }}
                  size="sm"
                  variant="danger"
                  className="qi-btn primary md"
                >
                  Yes
                </QIButton>
              </QIModalFooter>
            </QIModal>
            <pre className="code-exaple">
              <p>Documentation for the Components</p>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={ModalText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='file-uploader' className="element-item">
            <h2 className="sub-title">File Uploader</h2>

            <QIFileUploader
              label="Upload"
              placeholder="Only .pem and .crt files"
              onChange={(files) => { }}
            />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={FileUploaderText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id='pagination' className="element-item">
            <h2 className="sub-title">Pagination</h2>

            <QIPagination
              pageCount={40}
              onPageChange={(page) => {
                setPage(page);
                console.log('Page changed to:', page);
              }}
              activePage={page}
            />

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={PaginationText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>

          <section id="multi-select-dropdown" className="element-item">
            <h2 className="sub-title">Multi-select Dropdown</h2>

            
            <QIMultiSelectDropDown 
              label="Select Items"
              data={dropdownData}
              selected={selectedItems}
              onChange={handleMultiSelectChange}
              labelKey="name"
              onSearchPlaceHolder="Search items..."
              
            />
            

            <pre className="code-exaple">
              <p>Documentation for the Components</p>
              <br />
              <table>
                <thead>
                  <tr>
                    <th>Prop Name</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>Yes</td>
                    <td></td>
                    <td>Label text for the dropdown</td>
                  </tr>
                  <tr>
                    <td><code>data</code></td>
                    <td><code>array</code></td>
                    <td>Yes</td>
                    <td></td>
                    <td>Array of objects containing items to display</td>
                  </tr>
                  <tr>
                    <td><code>selected</code></td>
                    <td><code>array</code></td>
                    <td>Yes</td>
                    <td><code>[]</code></td>
                    <td>Array of selected item IDs</td>
                  </tr>
                  <tr>
                    <td><code>onChange</code></td>
                    <td><code>function</code></td>
                    <td>Yes</td>
                    <td></td>
                    <td>Callback function when selection changes</td>
                  </tr>
                  <tr>
                    <td><code>labelKey</code></td>
                    <td><code>string</code></td>
                    <td>No</td>
                    <td><code>"name"</code></td>
                    <td>Key to use for item labels from data objects</td>
                  </tr>
                  <tr>
                    <td><code>onSearchPlaceHolder</code></td>
                    <td><code>string</code></td>
                    <td>No</td>
                    <td><code>"Search..."</code></td>
                    <td>Placeholder text for search input</td>
                  </tr>
                </tbody>
              </table>
            </pre>

            <CopyBlock
              language={"jsx"}
              text={MultiSelectText}
              showLineNumbers={true}
              theme={dracula}
              wrapLines={true}
              codeBlock
            />
          </section>
        </main>
      </div>
    </>
  );
}
