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

***Note**: in this example I use absolute paths for accessing modules.*

First challenge could be a refactoring when a new DateTimePicker (eg. provides new functionality) needs to be tried out. In the worst case we have to iterate through on every component which uses the previous DateTimePicker and change it to the new one. If it has been abstracted away it is enough to go to DateTimePicker abstraction and change its current implementation to the latest one.   

## Solution

Not surprisingly Component Factories are coming to help us. Instead of defining actual components let's create factories which takes dependencies as parameters (one or many it totally depends on you) and by calling it, returns an actual component implementation. Just take a look on a `MyForm` factory:  

```jsx
// myForm.js

// No import statements

// MyForm is a React Component Factory
// It takes one object literal as parameter which contains actual Container, Label and DateTimePicker components and returns the current component implementation
const MyForm = ({ Container, Label, DateTimePicker }) => () => {
  return <Container>
    <Label>Expiration date </Label>
    <DateTimePicker />
  </Container>;
};

export default MyForm;
```

The first significant change is there are no import statements because `MyForm` receives dependencies as function arguments. `MyForm` is a factory from now, which means TODO: continue

```jsx
// app.js

// No import statements
const App = ({ Container, MyForm }) => () => {
  return <Container>
    <MyForm />
  </Container>
};

// composition-root.js
// Constructing component object graph

// importing dependencies
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

// importing factories
import App from 'components/app';
import MyForm from 'components/myForm';

// constructing actual React components by calling factories
const ActualMyForm = MyForm({ Container, Label, DateTimePicker }); 
const ActualApp = App({ Container, ActualMyForm });

// use this ActualApp in ReactDOM.render method
export default ActualApp;

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ActualApp from 'composition-root';

ReactDOM.render(<ActualApp />, document.getElementById('app'));
```

Can you see the difference? Managed to save flexibility and it's explicit. Code changing is not significant (but there is some) and we can avoid import statements at all in factories (`MyForm` and `App`) which implies it's totally safe when a file has been renamed or moved into different folder. All you need to do just change the path in one place in the code. 

I believe this a simple pattern, easy to refactor existing components and it can be applied to any React Component. Because of dependency injection it provides a new way for scaling your application even further. 

```jsx
const MyForm = ({ Container, Label, DateTimePicker }) => class MyForm {
  render() {
    return <Container>
      <Label>Expiration date </Label>
      <DateTimePicker />
    </Container>;
  }
};

// OR
const MyForm = ({ Container, Label, DateTimePicker }) => React.createClass({
  render() {
    return <Container>
      <Label>Expiration date </Label>
      <DateTimePicker />
    </Container>;
  }
});
```

## Putting Component Factories into React.js ecosystem

[TODO: displayName, propTypes etc.]

## Middlewares

[TODO]

JavaScript implements classes as functions and we can easily define class expressions in the code if it's necessary. 

In the next article I'll take further this Component Factory concept and show how powerful it can be with middleware patterns. 