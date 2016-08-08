Component Dependency Injection in React.js
==================================

## Introduction

Being a web frontend developer could be very annoying nowadays because we always need to relearn the cutting edge technologies every year. I really like those new technologies which comes a new concept or requires a totally mindset and provides a new way/toolset for developing applications. React.js and Redux (including Flux architecture) were definitely those libraries and brought new colour to the market and into my life as well. 

Additionally I'm big fan of Mark Seemann's book (Dependency Injection in .NET) and his term about pure dependency injection (previously Poor's Man DI). Mark distinguished dependencies into two categories: **stable** and **volatile**. Stable dependencies will not be changed (or it is unlikely) during the application development meanwhile volatile could be changed anytime and that's why it needs to be flexible. When I was reading his book about this I was wondering whether we can consider types as volatile dependencies? And the answer to question was yes, just think about type arguments in C++ where an `int` type could be different sizes on different architectures. 

My question is why we don't consider our UI components as volatile dependencies instead of stable? Are we so sure we'll use that 3rd party `DateTimePicker` during the development? What will happen when we find a better implementation or just want to customize it? Dp we need to refactor the whole code base if we used it heavily in our application. Why don't we prevent these issues and applying pure dependency injection even to UI components as well? 

```js
// myForm.js

// Importing our dependencies
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

// Defining a new component by using them
// MyForm uses DateTimePicker as its **stable** dependency
// because we cannot easily replace it to another DateTimePicker
const MyForm = () => {
  return <Container>
    <Label>Expiration date </Label>
    <DateTimePicker />
  </Container>;
};

export default MyForm;
```

## Existing solutions

Interestingly we can see several web frameworks who has already been supporting DI such as AngularJS or Aurelia, but they use them to inject services and factories, but we cannot really change easily the existing components in real code base. Thanks to React and its functional approach for component creation we can easily pass existing dependencies to any components. 

Let's take a quick look how we can use dependency injection between React components.

### Using properties to pass dependencies in React

The most obvious way to do that just passing our dependencies to the inner nodes and it's done like in this example:

```js
// myForm.js

// Defining a new component by getting Container, Label and DateTimePicker as properties
// MyForm uses DateTimePicker as its **stable** dependency
// because we cannot easily replace it to another DateTimePicker
const MyForm = ({ Container, Label, DateTimePicker }) => {
  return <Container>
    <Label>Expiration date </Label>
    <DateTimePicker />
  </Container>;
};

export default MyForm;

// app.js
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

import MyForm from 'components/myForm';

const App = () => {
  return <Container>
    <MyForm Container={Container} Label={Label} DateTimePicker={DateTimePicker} />
  </Container>;
};
```

Is it working and can we change its implementation in the future? Well definitely we can do that, but is it a proper design to do that? Well ... I'm not convinced in that. Properties should be use when a component rendering phase depends on runtime informations. `Container`, `Label` and `DateTimePicker` will not be replaced during the execution so we could define them in the [**composition root**](http://blog.ploeh.dk/2011/07/28/CompositionRoot/). 

**Note:** Contexts in React handles our concern (that's the reason why it exists), but it's too implicit (against React nature which everything should be explicit to avoid [*magic programming*](https://en.wikipedia.org/wiki/Magic_(programming)) situations) even if you need to specify ContextTypes in your component.

### Import statements

Modules are more flexible than namespaces especially in JavaScript and it provides more freedom for developers handling dependencies in each module. Going back to our previous example a new file can easily be created which contains all volatile UI components (that is the place where we're hiding actual components from each other) and using it for importing. 

```js
// components.js
import Container from 'components/container';
import Label from 'components/label';
import DateTimePicker from '3rd/dateTimePicker';

export default {
  Container,
  Label,
  DateTimePicker 
};

// myForm.js
// Hiding actual implementation by importing from components.js
import { Container, Label, DateTimePicker } from 'components';

const MyForm = ({ Container, Label, DateTimePicker }) => {
  return <Container>
    <Label>Expiration date </Label>
    <DateTimePicker />
  </Container>;
};

export default MyForm;
```

Javascript community has already thought this issue and that's why `export ... from 'file.js'` statements are considered to put into the language. This could work, but my problem about it, that it's not always so flexible - e.g. we have another `MyExtendedForm` component where I need to use another `DateTimePicker` implementation - do I need to rename the second implementation in my component? And isn't it difficult to tell that importing those components are considered as stable or volatile?

### Introducing Component Factories

I'd like to introduce a new concept in React which is **Component Factories**. Thanks to JavaScript React Components are implemented as objects so they can be passed to any functions. Before diving into the details let's take a look to this example: 

```js
// myForm.js

// No import statements

// MyForm is a React Component Factory
const MyForm = ({ Container, Label, DateTimePicker }) => () => {
  return <Container>
    <Label>Expiration date </Label>
    <DateTimePicker />
  </Container>;
};

export default MyForm;

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

```js
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

Javascript implements classes as functions and we can easily define class expressions in the code if it's necessary. 

In the next article I'll take further this Component Factory concept and show how powerful it can be with middleware patterns. 