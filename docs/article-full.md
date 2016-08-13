Component Factories in React.js
===============================

I've been thinking about for a long time how the dependencies could be manageable efficiently and why don't we consider components as volatile dependencies? After a little experimenting managed to get along with **Component Factories** which fits perfectly into the React ecosystem. 

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

_**Note**: in this example I use absolute paths for accessing modules._

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

The first significant change is there are no import statements because `MyForm` receives dependencies as function arguments and it has been renamed to `myForm`, because it is a factory from now. Without importing any components they need to be defined somehow and it seems defining a higher-order component is the most straightforward to us. `myForm` receives these components in the first parameter as an object literal. Thanks to ES6 destructuring language feature we're extracting only the necessary components. Please be advised that their usage hasn't been changed. 

Let's do this refactoring with `App` component as well.

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
const myForm = ({ Container, Label, DateTimePicker }) => class MyForm extends React.Component {
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

### Classical way

Classical or traditional way is to use prop types in the original form. For instance myForm is defined such like this:

```js
const myForm = ({ Container, Label, DateTimePicker }) => {
  const MyForm = ({ label, value }) => <Container>
    <Label>{label}</Label>
    <DateTimePicker value={value} />
  </Container>;

  MyForm.propTypes = {
    label: React.PropTypes.string.required,
    value: React.PropTypes.object.required
  };

  return MyForm;
};

export default myForm;
```

So nothing has been changed, component factory just wraps the whole actual component into a function. It's readable, doesn't require any 3rd party library and no need to learn new ways. There is no more boilerplate code. The only downside is `myForm` and `MyForm` that might be little confusing to the newcomers, so this style might be more readable: 

```js
import React from 'react';

export default ({ Container, Label, DateTimePicker }) => {
  const MyForm = ({ label, value }) => <Container>
    <Label>{label}</Label>
    <DateTimePicker value={value} />
  </Container>;

  MyForm.propTypes = {
    label: React.PropTypes.string.required,
    value: React.PropTypes.object.required
  };

  return MyForm;
};  
```

**Note**: By using static properties (`static propTypes = {...}`) in the classes we could return a class expression too.

### Functional way

[TODO: propTypes, displayName]

### Classical or functional?

Well... it depends on your coding style. Classical way is easier, it doesn't require more learning or 3rd party library support (if you don't want to reinvent the wheel), meanwhile functional way fits perfectly into the functional programming and reduces(?) the boilerplate code. At first I'd stay with classical and if code starts to stink then just switch to functional. 

### Higher-order components (such as `connect()` in React-Redux)

Higher-order components are not different from actual components they can be wrapped into another factory anytime. The most commonly used HOC is `connect()` function in React-Redux library. When creating a container with `connect` function we can wrap it into this form:

```js
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ...;
const mapDispatchToProps = (dispatch) => ...;

export default (ActualComponent) => connect(mapStateToProps, mapDispatchToProps)(ActualComponent);
// this is the same:
// export default connect(mapStateToProps, mapDispatchToProps);
```

There is a chance that `ActualComponent` has a factory as well but from our perspective we don't care where `ActualComponent` comes from.  

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

## Component factories vs. Higher-order components

You might be realized that **Component Factories** are very similar to **Higher-order Components**. So what is the difference? **Component Factories** could be considered to construct an actual component meanwhile **Higher-order Components** enhances them. Component Factories use HOC pattern to do their job, but there is no reason to use anything else. That explains the similarity between them.  

## Middlewares

[TODO]

JavaScript implements classes as functions and we can easily define class expressions in the code if it's necessary. 

In the next article I'll take further this Component Factory concept and show how powerful it can be with middleware patterns. 