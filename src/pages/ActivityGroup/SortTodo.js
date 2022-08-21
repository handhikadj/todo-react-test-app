import todoCurrentSelectedSortImg from '../../assets/images/todo-current-selected-sort.png';

const SortTodo = ({ sortItems, onTodoItemsSorted }) => (
  <div className="sort-todo">
    {sortItems.map((sortItem, index) => (
      <div
        className={`sort-item ${index > 0 ? 'border-top' : ''}`}
        key={index}
        onClick={() => onTodoItemsSorted(sortItem, index)}
        data-cy="sort-selection"
      >
        <img
          className="item-img"
          src={sortItem.img}
          alt={sortItem.img}
          data-cy="sort-selection-icon"
        />

        <p className="item-name" data-cy="sort-selection-title">
          {sortItem.label}
        </p>

        {sortItem.selected && (
          <img
            src={todoCurrentSelectedSortImg}
            alt={todoCurrentSelectedSortImg}
            data-cy="sort-selection-selected"
          />
        )}
      </div>
    ))}
  </div>
);

export default SortTodo;
