export default ({ TodoListItem, Container }, React) => {
  const TodoList = ({ items = [], onToggleItem }) => {
    const onToggle = (item) => (value) => onToggleItem && onToggleItem(item, value);
    return <Container className="todo-list">
      {items.map((item, index) => 
        <TodoListItem key={index} item={item} onToggleItem={onToggle(item)} />
      )}
    </Container>;
  }
  return TodoList;
};
