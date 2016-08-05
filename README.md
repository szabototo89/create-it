create-it
=========

Simple component creation library which helps to apply pure DI in your projects. 

## create-it <3 React.js

It has been designed to support React.js totally, but because its structure it can be applied to any JavaScript application. Instead of creating actual components why don't we create component factories? Consider components as volatile dependencies in your React components and apply DI patterns with full support! 

## Examples

```js
// factories/status.js

const status = ({ Container }) => ({ value }) => 
  <Container>
    Clicked: {value} times
  </Container>;

export default status;

// factories/increment.js

const increment = ({ Button }) => ({ onIncrement }) => 
  <Button onClick={onIncrement}>
    Increment
  </Button>;

export default increment;

// factories/app.js

const app = ({ Status, Increment, Container }) => class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  } 

  handleIncrement: () => {
    this.setState({
      value: this.state.value + 1
    })
  }

  render() {
    return <Container>
      <Status value={value} />
      <Increment onIncrement={this.handleIncrement} />
    </Container>;
  } 
}

export default app;

// compositionRoot.js

import { status, increment, app } from 'factories';
import { Container, Button } from 'components';

import createIt from 'create-it';

const create = createIt();

const Status = create({ Container })(status);
const Increment = create({ Button })(increment);
const App = create({ Status, Increment, Container })(app);

export default App;

// index.js
import React from 'react';
import { render } from 'react-dom';

render(<App value={0} />, document.getElementById('app'));

```