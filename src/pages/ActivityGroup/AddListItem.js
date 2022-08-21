import Select, { components } from 'react-select';
import { useEffect, useState } from 'react';
import modalAddListItemCloseImg from '../../assets/images/modal-add-list-item-close.png';
import chevronDownImg from '../../assets/images/chevron-down.png';
import todoCurrentSelectedSortImg from '../../assets/images/todo-current-selected-sort.png';

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <img src={chevronDownImg} alt={chevronDownImg} />
  </components.DropdownIndicator>
);

const customStyles = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    transition: 'all .25s',
  }),
  control: (provided) => ({
    ...provided,
    boxShadow: 0,
    transition: 'all .25s',
    padding: '10px 5px',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'inherit',
    color: '#4A4A4A',
    borderTop: '1px solid #E5E5E5',
    padding: '14px 17px',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
    borderRadius: '0 0 6px 6px',
    transition: 'all .25s',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0,
    transition: 'all .25s',
  }),
};

export const prioritySelectOptions = [
  {
    id: 1,
    priority: 'very-high',
    label: 'Very High',
  },
  {
    id: 2,
    priority: 'high',
    label: 'High',
  },
  {
    id: 3,
    priority: 'normal',
    label: 'Medium',
  },
  {
    id: 4,
    priority: 'low',
    label: 'Low',
  },
  {
    id: 5,
    priority: 'very-low',
    label: 'Very Low',
  },
];

const SelectedSortItem = ({
  context,
  priority,
  selectedOptionValue = null,
}) => {
  const selectedSort = selectedOptionValue
    ? prioritySelectOptions.find(
        (selectOption) => selectOption.id === selectedOptionValue.id
      )
    : null;

  if (context === 'menu' && priority === selectedSort?.priority) {
    return (
      <img src={todoCurrentSelectedSortImg} alt={todoCurrentSelectedSortImg} />
    );
  }

  return null;
};

const AddListItem = ({
  onCloseClicked,
  onSubmitted,
  defaultFormValues = null,
}) => {
  const [listItemName, setListItemName] = useState('');
  const [selectedOptionValue, setSelectedOptionValue] = useState(null);

  const onSaveClicked = () => {
    onSubmitted({ listItemName, selectedOptionValue });
  };

  const formatOptionLabel = ({ id, priority, label }, { context }) => (
    <div className="add-list-item-priority-option w-full">
      <div
        className={`dot-priority ${priority}`}
        style={{ marginRight: 20, width: 14, height: 14 }}
      />
      <span>{label}</span>
      <div style={{ flex: 1 }} />
      <SelectedSortItem
        context={context}
        priority={priority}
        selectedOptionValue={selectedOptionValue}
      />
    </div>
  );

  useEffect(() => {
    if (defaultFormValues) {
      setListItemName(defaultFormValues.listItemName);
      setSelectedOptionValue(defaultFormValues.selectedOptionValue);
    } else {
      setListItemName('');
      setSelectedOptionValue({
        id: 1,
        priority: 'very-high',
        label: 'Very High',
      });
    }
  }, [defaultFormValues]);

  return (
    <div className="add-list-item">
      <div className="modal-title-section">
        <h1 className="title">Tambah List Item</h1>

        <img
          src={modalAddListItemCloseImg}
          alt={modalAddListItemCloseImg}
          className="cursor-pointer"
          onClick={onCloseClicked}
        />
      </div>

      <div className="modal-content-section">
        <div className="input-form">
          <label htmlFor="list-item-name" className="todo-label-form w-fit">
            NAMA LIST ITEM
          </label>
          <input
            id="list-item-name"
            className="list-item-name-input w-full"
            value={listItemName}
            onChange={(e) => setListItemName(e.target.value)}
          />
        </div>

        <div className="select-form" style={{ marginTop: '26px' }}>
          <label
            htmlFor="priority"
            className="todo-label-form"
            style={{ marginBottom: '10px' }}
          >
            PRIORITY
          </label>

          <div style={{ width: 205 }}>
            <Select
              options={prioritySelectOptions}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
              placeholder="Pilih priority"
              styles={customStyles}
              isSearchable={false}
              onChange={(value) => setSelectedOptionValue(value)}
              getOptionValue={(option) => option.priority}
              value={selectedOptionValue}
              formatOptionLabel={formatOptionLabel}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer-section">
        <button
          disabled={!listItemName}
          type="button"
          onClick={onSaveClicked}
          className="cursor-pointer"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default AddListItem;
