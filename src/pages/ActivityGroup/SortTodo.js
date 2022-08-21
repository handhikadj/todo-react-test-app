import todoCurrentSelectedSortImg from '../../assets/images/todo-current-selected-sort.png';

const SortTodo = ({ sortItems, onTodoItemsSorted }) => (
  <div className="sort-todo">
    {sortItems.map((sortItem, index) => (
      <div
        className={`sort-item ${index > 0 ? 'border-top' : ''}`}
        key={index}
        onClick={() => onTodoItemsSorted(sortItem, index)}
      >
        <img className="item-img" src={sortItem.img} alt={sortItem.img} />

        <p className="item-name">{sortItem.label}</p>

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

export default SortTodo;
