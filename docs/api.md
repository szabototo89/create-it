create.js API Reference
=====================================

## `createIt()`
## `filter()`
## `concat()`
## `merge()`
## `compose()`

## Middlewares

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

## `placeholder()`