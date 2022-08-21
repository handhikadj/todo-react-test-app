import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Dialog, Menu } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import todoBackButtonImg from '../../assets/images/todo-back-button.png';
import todoEmptyStateImg from '../../assets/images/todo-empty-state.png';
import { axiosInstance } from '../../services/network/axiosUtils';
import AddListItem, { prioritySelectOptions } from './AddListItem';
import todoTitleEditButtonImg from '../../assets/images/todo-title-edit-button.png';
import todoSortButtonImg from '../../assets/images/todo-sort-button.png';
import SortTodo from './SortTodo';
import activityItemDeleteButton from '../../assets/images/activity-item-delete-button.png';
import DeleteData from '../../components/common/DeleteData';
import todoNewestSortImg from '../../assets/images/todo-newest-sort.png';
import todoOldestSortImg from '../../assets/images/todo-oldest-sort.png';
import todoAToZSortImg from '../../assets/images/todo-a-to-z-sort.png';
import todoZToASortImg from '../../assets/images/todo-z-to-a-sort.png';
import todoUnfinishedSortImg from '../../assets/images/todo-unfinished-sort.png';

const ActivityGroup = () => {
  const { id: urlIdParam } = useParams();

  const [currentActivityGroup, setCurrentActivityGroup] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editingTitle, setEditingTitle] = useState(false);
  const [currentActivityGroupTitle, setCurrentActivityGroupTitle] =
    useState('');
  const [openAddListItemDialog, setOpenAddListItemDialog] = useState(false);
  const [anchorSortTodoMenu, setAnchorSortTodoMenu] = useState(null);
  const [openDeleteDataDialog, setOpenDeleteDataDialog] = useState(false);
  const [selectedTodoItem, setSelectedTodoItem] = useState(null);
  const [selectedSortTodoItemId, setSelectedSortTodoItemId] = useState(1);
  const [sortItems, setSortItems] = useState([
    {
      id: 1,
      img: todoNewestSortImg,
      name: 'newest',
      label: 'Terbaru',
      selected: true,
    },
    {
      id: 2,
      img: todoOldestSortImg,
      name: 'oldest',
      label: 'Terlama',
      selected: false,
    },
    {
      id: 3,
      img: todoAToZSortImg,
      name: 'a-z',
      label: 'A-Z',
      selected: false,
    },
    {
      id: 4,
      img: todoZToASortImg,
      name: 'z-a',
      label: 'Z-A',
      selected: false,
    },
    {
      id: 5,
      img: todoUnfinishedSortImg,
      name: 'unfinished',
      label: 'Belum Selesai',
      selected: false,
    },
  ]);

  const inputCurrentActivityGroupRef = useRef(null);

  const resetSelectedSortItem = () => {
    const newSortItems = [...sortItems];

    newSortItems.forEach((item) => (item.selected = false));

    newSortItems[0].selected = true;
    setSortItems(newSortItems);
  };

  const loadActivityGroup = async () => {
    resetSelectedSortItem();
    const { data } = await axiosInstance.get(`/activity-groups/${urlIdParam}`);
    setCurrentActivityGroup(data);
    setTodos(data.todo_items);
    setCurrentActivityGroupTitle(data.title);
  };

  const editTitle = () => {
    setEditingTitle(true);
  };

  const blurActivityGroupTitleInputKeyDown = async () => {
    setEditingTitle(false);

    const { data } = await axiosInstance.patch(
      `/activity-groups/${urlIdParam}`,
      {
        title: currentActivityGroupTitle,
      }
    );
  };

  const activityGroupTitleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      blurActivityGroupTitleInputKeyDown();
    }
  };

  const handleSortBtnClick = (e) => {
    setAnchorSortTodoMenu(e.currentTarget);
  };

  const handleAddListItemClose = () => {
    setOpenAddListItemDialog(false);
    setSelectedTodoItem(null);
  };

  const onAddListItemSubmitted = async (value) => {
    const { listItemName, selectedOptionValue } = value;

    const url = selectedTodoItem
      ? `/todo-items/${selectedTodoItem.id}`
      : '/todo-items';

    const axiosReq = selectedTodoItem
      ? axiosInstance.patch
      : axiosInstance.post;

    const { data } = await axiosReq(url, {
      ...(selectedTodoItem && selectedTodoItem),
      activity_group_id: urlIdParam,
      title: listItemName,
      priority: selectedOptionValue.priority,
    });

    handleAddListItemClose();
    loadActivityGroup();
  };

  const onEditTodoClicked = (todoItem) => {
    setSelectedTodoItem(todoItem);
    setOpenAddListItemDialog(true);
  };

  const handleCloseDeleteDataDialog = () => {
    setOpenDeleteDataDialog(false);
    setSelectedTodoItem(null);
  };

  const onDeleteDataButtonClicked = (todoItem) => {
    setSelectedTodoItem(todoItem);
    setOpenDeleteDataDialog(true);
  };

  const onTodoItemCheckboxChange = async (todoItem, index) => {
    const newTodoItem = { ...todoItem };

    const newTodos = [...todos];
    newTodos[index].is_active = newTodoItem.is_active ? 0 : 1;
    setTodos(newTodos);

    await axiosInstance.patch(`/todo-items/${todoItem.id}`, {
      is_active: newTodoItem.is_active ? 0 : 1,
    });

    loadActivityGroup();
  };

  const onConfirmDeleteDataDialog = async (todoItemId) => {
    if (!todoItemId) return;

    await axiosInstance.delete(`/todo-items/${todoItemId}`);

    handleCloseDeleteDataDialog();
    loadActivityGroup();
  };

  const sortTheTodoItems = ({ name }) => {
    const newTodos = [...todos];

    if (name === 'oldest') {
      setTodos(newTodos.sort((a, b) => a.id - b.id));
      return;
    }

    if (name === 'a-z') {
      setTodos(newTodos.sort((a, b) => a.title.localeCompare(b.title)));
      return;
    }

    if (name === 'z-a') {
      setTodos(newTodos.sort((a, b) => b.title.localeCompare(a.title)));
      return;
    }

    if (name === 'unfinished') {
      setTodos(newTodos.sort((a, b) => b.is_active - a.is_active));
      return;
    }

    // default/newest
    setTodos(newTodos.sort((a, b) => b.id - a.id));
  };

  const onSortTodoSorted = (sortItem, index) => {
    const newSortItems = [...sortItems];

    newSortItems.forEach((item) => (item.selected = false));

    newSortItems[index].selected = true;
    setSortItems(newSortItems);

    sortTheTodoItems(sortItem);

    setAnchorSortTodoMenu(null);
  };

  useEffect(() => {
    loadActivityGroup();
  }, []);

  useEffect(() => {
    if (editingTitle) {
      inputCurrentActivityGroupRef.current.focus();
    }
  }, [editingTitle]);

  return (
    <div className="activity-group">
      <div className="activity-tambah-section">
        <Link to="/" style={{ lineHeight: 0 }}>
          <img
            src={todoBackButtonImg}
            alt={todoBackButtonImg}
            className="todo-back-button"
          />
        </Link>

        {!editingTitle ? (
          <h1 className="activity-group-title">{currentActivityGroupTitle}</h1>
        ) : (
          <input
            className="activity-group-title"
            value={currentActivityGroupTitle}
            style={{
              flex: 0,
            }}
            ref={inputCurrentActivityGroupRef}
            onChange={(e) => setCurrentActivityGroupTitle(e.target.value)}
            onKeyDown={activityGroupTitleInputKeyDown}
            onBlur={blurActivityGroupTitleInputKeyDown}
          />
        )}

        <div style={{ marginLeft: '27px', flex: 1 }}>
          <img
            className="cursor-pointer"
            src={todoTitleEditButtonImg}
            alt={todoTitleEditButtonImg}
            style={{ marginTop: '10px' }}
            onClick={editTitle}
          />
        </div>

        {todos.length > 0 && (
          <img
            src={todoSortButtonImg}
            alt={todoSortButtonImg}
            className="cursor-pointer"
            onClick={handleSortBtnClick}
          />
        )}

        <Menu
          open={Boolean(anchorSortTodoMenu)}
          anchorEl={anchorSortTodoMenu}
          onClose={() => setAnchorSortTodoMenu(null)}
          MenuListProps={{
            disablePadding: true,
          }}
          elevation={4}
        >
          <SortTodo
            sortItems={sortItems}
            onTodoItemsSorted={onSortTodoSorted}
          />
        </Menu>

        <button
          type="button"
          className="add-button"
          style={{ marginLeft: '18px' }}
          onClick={() => setOpenAddListItemDialog(true)}
        >
          <AddIcon style={{ marginRight: '10px' }} />
          Tambah
        </button>

        <Dialog
          open={openAddListItemDialog}
          maxWidth={false}
          PaperProps={{ style: { overflowY: 'visible' } }}
          onClose={handleAddListItemClose}
        >
          <AddListItem
            onCloseClicked={handleAddListItemClose}
            onSubmitted={onAddListItemSubmitted}
            defaultFormValues={
              selectedTodoItem
                ? {
                    listItemName: selectedTodoItem.title,
                    selectedOptionValue: prioritySelectOptions.find(
                      (option) => option.priority === selectedTodoItem.priority
                    ),
                  }
                : null
            }
          />
        </Dialog>
      </div>

      <div className="container-content-list">
        {!todos.length ? (
          <div className="w-full h-full text-center">
            <img
              src={todoEmptyStateImg}
              alt={todoEmptyStateImg}
              onClick={() => setOpenAddListItemDialog(true)}
              className="cursor-pointer"
            />
          </div>
        ) : (
          todos.map((todoItem, index) => (
            <div className="w-full h-full todo-item" key={todoItem.id}>
              <Checkbox
                disableRipple
                onChange={() => onTodoItemCheckboxChange(todoItem, index)}
                checked={!todoItem.is_active}
              />

              <div
                className={`dot-priority ${todoItem.priority}`}
                style={{ margin: '0 20px 0 10px' }}
              />

              <span
                className={`todo-title ${!todoItem.is_active ? 'done' : ''}`}
                style={{ marginRight: 20 }}
              >
                {todoItem.title}
              </span>

              <img
                src={todoTitleEditButtonImg}
                alt={todoTitleEditButtonImg}
                className="cursor-pointer"
                onClick={() => onEditTodoClicked(todoItem)}
              />

              <div style={{ flex: 1 }} />

              <img
                src={activityItemDeleteButton}
                alt={activityItemDeleteButton}
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onDeleteDataButtonClicked(todoItem);
                }}
              />
            </div>
          ))
        )}

        <Dialog
          open={openDeleteDataDialog}
          onClose={handleCloseDeleteDataDialog}
        >
          <DeleteData
            descriptionText={selectedTodoItem ? selectedTodoItem.title : ''}
            onCancel={handleCloseDeleteDataDialog}
            onConfirm={() =>
              onConfirmDeleteDataDialog(
                selectedTodoItem ? selectedTodoItem.id : null
              )
            }
          />
        </Dialog>
      </div>
    </div>
  );
};

export default ActivityGroup;
