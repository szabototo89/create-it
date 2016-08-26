export default ({ TodoListItem }, React) => {
  const TodoList = ({ items = [] }) => <div>
    {items.map((item, index) => 
      <TodoListItem key={index} item={item} />
    )}
  </div>;
  return TodoList;
};
