create-it.js API Reference
=====================================

## `createIt()`

## `concat(...actualDependencies: Array<any>, [options]: Object)(create: CreateFunction): CreateFunction`

Returns a new `create` function with appended/prepended actual dependencies. It helps for reducing code duplications in dependency configurations. 

### Arguments

  - `actualDependencies` _(any)_: Actual dependencies for components. These will be added for every components. 
  - `options` _(Object)_ **[optional]**: Specifies more options for constructing components. 
    - `isAppending` _(Boolean)_ **[optional, default value = true]**: Whether it is true actual dependencies will be appended to end of the dependencies otherwise will be prepended to the beginning.  

### Returns

Returns a new `create` function for constructing new components.

### Example

```js
// ------------------------
// configure.js
// ------------------------

import React from 'react';
import createIt, { concat } from 'create-it';
import button from './factories/button';
import application from './factories/application';

const createBase = createIt();

// passing React as dependency to every component in the last parameter
const create = concat(React)(createBase);

const Button = create()(button);
const Application = create({ Button })(application);

export default Application;

// ------------------------
// factories/application.js
// ------------------------

// no need to import React, because Stateless Component gets it as a dependency.
export default ({ Button }, React) => ({ label, onClick }) => 
  <Button label={label} onClick={onClick} />;

// ------------------------
// factories/button.js
// ------------------------

// only dependency is the React library
export default (React) => ({ label, onClick }) => 
  <button onClick={onClick}>{label}</button>;
```

## `merge(...actualDependencies: Array<Object>)(create: CreateFunction): CreateFunction`

Returns a new `create` function and it merges actual dependencies to the new dependencies. 

### Arguments

- `actualDependencies` _(any)_: Actual dependencies for components. These will be added for every components.

### Returns

Returns a new `create` function for constructing new components.

### Example

```js
// ---------------------
// configure.js
// ---------------------

import createIt, { merge } from 'create-it';

import Container from './components/container';
import Button from './components/button';

import incrementer from './factories/incrementer';
import application from './factories/application';

const create = merge({ Button, Container })(createIt());

const Incrementer = create(/*{ Button, Container }*/)(incrementer);
const Application = create({ Incrementer /*, Button, Container */ })(application);

export default Application;
```

## `compose(...functions: Array<Function>): Function`

Returns specified functions composed version. Such as: `f(g(h())) === compose(f, g, h)()` where `f`,`g`,`h` are functions.

### Arguments

- `functions`: Array<Function>: Composable functions 

### Returns

[TODO]

### Example

```js
// ---------------------
// configure.js
// ---------------------
import React from 'react';
import createIt, { concat, merge, compose } from 'create-it';

import Container from './components/container';
import Button from './components/button';

import incrementer from './factories/incrementer';
import application from './factories/application';

const mergeActualComponents = merge({ Button, Container });
const appendReactLibrary = concat(React);

const create = compose(
  appendReactLibrary,
  mergeActualComponents 
)(createIt()); // === appendReactLibrary(mergeActualComponents(createIt()));

const Incrementer = create(/* { Button, Container }, React */)(incrementer);
const Application = create({ Incrementer /*, Button, Container */ } /*, React*/)(application);

export default Application;
```

## Middlewares

## `filter()`
## `autoAppend()`
## `createMiddleware()`

## Factories

## `none(): React.Component`

Returns a `null` React Component. It's great for using as placeholder component while the actual one is not implemented. 

### Returns

Returns a stateless React Component.

### Example

```js
import { none } from 'create-it/factories';
import button from './factories/button';
import app from './factories/app';

const Button = create()(button);
const App = create({ 
  Button, 
  Sidebar: none() // Sidebar is not implemented yet 
})(app);
```

## `placeholder(text: string): React.Component`

Returns a simple text as React Component.  

### Arguments

  - `text` _(string)_: The text for component content.  

### Returns

Returns a simple text content wrapped into `<div />` HTML elements. 

### Example

```js
import { placeholder } from 'create-it/factories';
import button from './factories/button';
import app from './factories/app';

const Button = create()(button);
const App = create({ 
  Button, 
  Sidebar: placeholder('Sidebar - under development') // Sidebar is not implemented yet 
})(app);
```