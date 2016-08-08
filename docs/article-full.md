Component Factories in React.js
===============================

I've been thinking about for a long time how the dependencies could be manageable efficiently and how we cwhy don't we consider components as volatile dependencies? After a little experimenting managed to get along with **Component Factories** which fits perfectly into the React ecosystem. 

## Problem

Let's take a look the current code section and analyze it: 

```jsx
// myForm.js

// Importing our dependencies
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

// Defining a new component by using them
// MyForm uses DateTimePicker as its **stable** dependency
// because we cannot easily replace it to another DateTimePicker
const MyForm = ({ label, value }) => {
  return <Container>
    <Label>{label}</Label>
    <DateTimePicker value={value} />
  </Container>;
};

export default MyForm;

// app.js
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

import MyForm from 'components/myForm';

const App = ({ value }) => {
  return <Container>
    <MyForm label="Expiration date" value={value} />
  </Container>;
};
```

Let's assume our application renders a customized `Form` (let's call it `MyForm`) and takes two properties. `MyForm` is a stateless component and it renders a `Label` and a `DateTimePicker` (this comes from a 3rd party library) within a `Container`. These guys are coming from external files.

**Note**: in this example I use absolute paths for accessing modules.

First challenge could be a refactoring when a new DateTimePicker (eg. provides new functionality) needs to be tried out. In the worst case we have to iterate through on every component which uses the previous DateTimePicker and change it to the new one. If it has been abstracted away it is enough to go to DateTimePicker abstraction and change its current implementation to the latest one.   

## Solution

Not surprisingly Component Factories are coming to help us. Instead of defining actual components let's create factories which takes dependencies as parameters (one or many it totally depends on you) and by calling it, returns an actual component implementation. Just take a look on a `MyForm` factory:  

```jsx
// myForm.js

// No import statements

// MyForm is a React Component Factory
// It takes one object literal as parameter which contains actual Container, Label and DateTimePicker components and returns the current component implementation
const myForm = ({ Container, Label, DateTimePicker }) => ({ label, value }) => {
  return <Container>
    <Label>{label}</Label>
    <DateTimePicker value={value} />
  </Container>;
};

export default myForm;
```

The first significant change is there are no import statements because `MyForm` receives dependencies as function arguments. `MyForm` is a factory from now, which means TODO: continue

```jsx
// app.js

// No import statements
const app = ({ Container, MyForm }) => ({ value }) => {
  return <Container>
    <MyForm value={value} label="Expiration date" />
  </Container>
};

export default app;
```
```js
// composition-root.js

// Constructing component object graph

// importing dependencies
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

// importing factories
import app from 'factories/app';
import myForm from 'factories/myForm';

// constructing actual React components by calling factories
const MyForm = myForm({ Container, Label, DateTimePicker }); 
const App = app({ Container, MyForm });

// use this App in ReactDOM.render method
export default App;

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'composition-root';

ReactDOM.render(<App value={Date.now()} />, document.getElementById('app'));
```

Can you see the difference? Managed to save flexibility and it's explicit. Code changing is not significant (but there is some) and we can avoid import statements at all in factories (`MyForm` and `App`) which implies it's totally safe when a file has been renamed or moved into different folder. All you need to do just change the path in one place in the code. 

I believe this a simple pattern, easy to refactor existing components and it can be applied to any React Component. Because of dependency injection it provides a new way for scaling your application even further. 

```jsx
const myForm = ({ Container, Label, DateTimePicker }) => class MyForm {
  render() {
    const { value, label } = this.props;

    return <Container>
      <Label>{label}</Label>
      <DateTimePicker value={value} />
    </Container>;
  }
};

// OR
const myForm = ({ Container, Label, DateTimePicker }) => React.createClass({
  render() {
    const { value, label } = this.props;

    return <Container>
      <Label>{label}</Label>
      <DateTimePicker value={value} />
    </Container>;
  }
});
```

## Putting Component Factories into React.js ecosystem

Component factories are coming to help us when we want a quick way to change component implementations, but how they fit into the React.js ecosystem? Not surprisingly we can still use React features such as prop/context types or display names, but it requires a little tooling. Several options have been provided for users and it needs to be decided which style will be used in the applications.

### Classic way

[TODO: finish]

### Functional way

[TODO: finish]

[TODO: displayName, propTypes etc.]

## Road to create-it.js

Alright, we know what **Component Factories** are and how we can use. Let's get started to play with these concepts and release its true nature. Take a look to this example:

```js
const MyForm = myForm({ Container, Label, DateTimePicker }); 
const App = app({ Container, MyForm });
```

By introducing a new constructor function we can hide actual instantiation from the user.

```js
const create = (...dependencies) => (factory) => factory(...dependencies);

const MyForm = create({ Container, Label, DateTimePicker })(myForm);
const App = create({ Container, MyForm })(app);
```

What has been changed? We're passing dependencies as the first and factory as the second parameter. Its benefit is that we can remove code duplications where factories reuse the same dependencies:

```js
const create = (...dependencies) => (factory) => factory(...dependencies);

const actualComponents = { Container, Label, DateTimePicker };

const createWithActualComponents = (components, ...dependencies) => 
                                   create({ ...actualComponents, ...components }, ...dependencies);

const MyForm = createWithActualComponents()(myForm); // passing Container, Label and DateTimePicker
const App = createWithActualComponents({ MyForm })(app); // passing Container, Label and DateTimePicker
``` 

All actual components have been passed, but it's not a big deal, because we're just passing references and destructuring feature hides what other components have been passed to the factories. So it's a good practice to store *leaf components* (*actual components*) in an object and merge with other dependencies at every instantiation.

## Middlewares

[TODO]

JavaScript implements classes as functions and we can easily define class expressions in the code if it's necessary. 

In the next article I'll take further this Component Factory concept and show how powerful it can be with middleware patterns. 