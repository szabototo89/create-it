create-it.js API Reference
=====================================

## `createIt()`

## `concat([actualDependencies]: Array, [options]: Object)(create: CreateFunction): CreateFunction`

Returns a new `create` function with appended/prepended actual dependencies. It helps for reducing code duplications in dependency configurations. 

### Arguments

  - actualDependencies _(Array)_ **[optional]**: Actual dependencies for components. These will be added for every components. 
  - options _(Object)_ **[optional]**: Specifies more options for constructing components. 
    - isAppending _(Boolean)_ **[optional, default value = true]**: Whether it is true actual dependencies will be appended to end of the dependencies otherwise will be prepended to the beginning.  

### Returns

Returns a new `create` function for constructing new components.

### Example

[TODO]

## `merge()`
## `compose()`

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