export default ({ Container }, React) => {
  const TodoListItem = ({ item, onToggleItem }) => {
    const { isDone, value } = item;
    const onToggle = (value) => () => {
      return onToggleItem && onToggleItem(value);
    };

    return <Container className="todo-list-item" onClick={onToggle(!isDone)}>
      {value} {isDone && <span>(Done)</span>}
    </Container>;
  };

  return TodoListItem;
};
