export default ({ Container, Button }, React) => {
  const TodoController = ({ onChange }) => {
    const onVisibilityChange = (value) => () => onChange && onChange(value);

    return <Container className="todo-controller">
      <Button onClick={onVisibilityChange('completed')}>Completeted</Button>
      <Button onClick={onVisibilityChange('not-completed')}>Not completed</Button>
      <Button onClick={onVisibilityChange('all')}>All</Button>
    </Container>;
  }

  return TodoController;
};
