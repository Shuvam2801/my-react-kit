export const ButtonText = `
<QIButton
    type="button"
    size="md"
    className="qi-btn primary"
    variant="link"
    disabled={false}
    icon={}
    loading={true}
    >
    Login
</QIButton>
`
export const CheckBoxText = `
<QICheckBox 
  label="I agree to the terms"
  checked={false}
  onChange={() => setIsChecked(!isChecked)}
/>
`
export const InputText = `
const [inputValue, setInputValue] = useState('');

<QIInput 
  value={inputValue}
  onChange={setInputValue}
  placeholder="Type something..."
/>
`

export const SelectText = `
<QISelect label={"Dropdown"} value={selected} onChange={(e) => setSelected(e.target.value)}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
</QISelect>
`

export const SwitchText = `
<QISwitch
    label={switchValue ? "Enabled" : "Disabled"}
    className=""
    value={true}
    onChange={() => setSwitchValue(!switchValue)}
/>
`
export const RadioButtonText = `
<QIRadioButton radioObjects={radioObject} />
`

export const ListCardText = `
<QITracksListCard key={1} data={tripData} />
`

export const SpinnerText = `
<QISpinner />
`
export const SliderText = `
<QISlideSelect pagination={pagination} />
`

export const TableText = `
<QITable headers={headers} data={tableData || []} />
`
export const DatePickertext = `
<QIDatePicker
    resetCount={resetCount}
    selectedRange={selectedRange}
    setSelectedRange={setSelectedRange}
    setResetCount={setResetCount}
    openCalendar="left"
/>
`
export const ModalText = `
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
`
export const FileUploaderText = `
<QIFileUploader
    label="Upload"
    placeholder="Only .pem and .crt files"
    onChange={(files) => { }}
/>
`
export const PaginationText =`
<QIPagination
    pageCount={40}
    onPageChange={() => { }}
    activePage={0}
/>
`

export const MultiSelectText = `
import { QIMultiSelectDropDown } from '@qinvent/react-kit';

const [selectedItems, setSelectedItems] = useState([]);

const dropdownData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" }
];

const handleMultiSelectChange = (selected) => {
  setSelectedItems(selected);
};

<QIMultiSelectDropDown 
  label="Select Items"
  data={dropdownData}
  selected={selectedItems}
  onChange={handleMultiSelectChange}
  labelKey="name"
  onSearchPlaceHolder="Search items..."
/>
`;
export const ListText = `
// List columns configuration
const listColumns = [
  {
    label: "ID",
    key: "id",
    sortable: true,
    width: "80px"
  },
  {
    label: "Name",
    key: "name",
    sortable: true,
    width: "200px"
  },
  {
    label: "Report Type",
    key: "report_type",
    sortable: true,
    width: "150px"
  },
  {
    label: "Status",
    key: "status",
    sortable: true,
    width: "120px",
    type: "component",
    component: ({ data }) => (
      <span className={\`status-badge \${data.status}\`} style={{
        backgroundColor: data.status === 'completed' ? '#e6f7e6' : '#fff3e0',
        color: data.status === 'completed' ? '#2e7d32' : '#e65100',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        {data.status === 'completed' ? 'Completed' : 'In Progress'}
      </span>
    )
  },
  {
    label: "Created By",
    key: "created_by",
    width: "150px"
  }
];

// List handler functions
const listHandler = {
  sortingHandler: (key, sortType) => {
    console.log(\`Sorting by \${key} in \${sortType} order\`);
  },
  rowHandler: (rowData) => {
    console.log('Row clicked:', rowData);
  }
};

// Using the QIList component with scrolling
<QIList
  columns={listColumns}
  data={tableData}
  handler={listHandler}
  status={[]}
  initialRows={5}
  scrollbarHeight="17.5rem"
  customScrollbar={true}
/>
`;