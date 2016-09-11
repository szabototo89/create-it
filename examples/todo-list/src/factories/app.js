export default ({ Container, TodoList, TodoController }, React) => {
  class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        items: this.props.items,
        visibleItems: this.props.items
      };

      this.handleToggleItem = this.handleToggleItem.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleToggleItem(item, value) {
      this.setState({
        items: this.state.items.map(currentItem => {
          if (item.id === currentItem.id) {
            return {
              ...item,
              isDone: value
            };
          }

          return currentItem;
        })
      });
    }

    getVisibleItems(items, visibility) {
      return items.filter(item => {
        if (visibility === 'completed') return item.isDone;
        if (visibility === 'not-completed') return !item.isDone;

        return true;
      })
    }

    handleChange(visibility) {
      const { items } = this.state;

      this.setState({
        visibility
      });
    }

    render() {
      const { items, visibility } = this.state;

      const visibleItems = this.getVisibleItems(items, visibility);

      return (<Container className="app">
        <TodoList items={visibleItems} onToggleItem={this.handleToggleItem} />
        <TodoController onChange={this.handleChange} />
      </Container>);
    }
  }

  return App;
};
