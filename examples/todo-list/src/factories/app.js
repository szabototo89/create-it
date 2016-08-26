export default ({ TodoList, TodoController }, React) => {
  const App = ({ items }) => <div>
    <TodoList items={items} />
    <TodoController />
  </div>;

  return App;
};
