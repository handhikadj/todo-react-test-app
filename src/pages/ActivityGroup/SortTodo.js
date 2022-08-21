import { useEffect, useState } from 'react';
import todoNewestSortImg from '../../assets/images/todo-newest-sort.png';
import todoOldestSortImg from '../../assets/images/todo-oldest-sort.png';
import todoAToZSortImg from '../../assets/images/todo-a-to-z-sort.png';
import todoZToASortImg from '../../assets/images/todo-z-to-a-sort.png';
import todoUnfinishedSortImg from '../../assets/images/todo-unfinished-sort.png';
import todoCurrentSelectedSortImg from '../../assets/images/todo-current-selected-sort.png';

const SortTodo = ({ onTodoItemsSorted, selectedSortItemId = 1 }) => {
  const [sortItems, setSortItems] = useState([
    {
      id: 1,
      img: todoNewestSortImg,
      name: 'Terbaru',
      selected: true,
    },
    {
      id: 2,
      img: todoOldestSortImg,
      name: 'Terlama',
      selected: false,
    },
    {
      id: 3,
      img: todoAToZSortImg,
      name: 'A-Z',
      selected: false,
    },
    {
      id: 4,
      img: todoZToASortImg,
      name: 'Z-A',
      selected: false,
    },
    {
      id: 5,
      img: todoUnfinishedSortImg,
      name: 'Belum Selesai',
      selected: false,
    },
  ]);

  const onSortItemClicked = (sortItem, index) => {
    const newSortItems = [...sortItems];

    newSortItems.forEach((item) => (item.selected = false));

    newSortItems[index].selected = true;
    setSortItems(newSortItems);

    onTodoItemsSorted(newSortItems[index]);
  };

  // useEffect(() => {

  // }, [selectedSortItemId])

  return (
    <div className="sort-todo">
      {sortItems.map((sortItem, index) => (
        <div
          className={`sort-item ${index > 0 ? 'border-top' : ''}`}
          key={index}
          onClick={() => onSortItemClicked(sortItem, index)}
        >
          <img className="item-img" src={sortItem.img} alt={sortItem.img} />

          <p className="item-name">{sortItem.name}</p>

          {sortItem.selected && (
            <img
              src={todoCurrentSelectedSortImg}
              alt={todoCurrentSelectedSortImg}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SortTodo;
