export default ({ ListContainer }, React) => {
  const TodoListItem = ({ item }) => {
    const { isDone, value } = item;

    return <ListContainer>
      {value} {isDone && <span>(Done)</span>}
    </ListContainer>;
  };

  return TodoListItem;
};
