import React from 'react';
import createIt, { concat, map } from 'create-it';

import errorContainer from '../components/errorContainer';

import container from '../factories/container';

import app from '../factories/app';
import todoList from '../factories/todoList';
import todoListItem from '../factories/todoListItem';
import todoController from '../factories/todoController';

const none = () => () => null;

const applyConfig = create => {
  const appendReactLibrary = concat([ React ], { isAppending: false });
  const wrapErrorContainer = map(component => errorContainer(component));

  return appendReactLibrary(wrapErrorContainer(create));
};

const create = applyConfig(createIt());

const Container = create()(container);

const TodoListItem = create({ ListContainer: Container })(todoListItem);

const TodoList = create({ TodoListItem })(todoList);

const TodoController = create()(todoController);

const App = create({ 
  TodoList, 
  TodoController
})(app);

export default App;
