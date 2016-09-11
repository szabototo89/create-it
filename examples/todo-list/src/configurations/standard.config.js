import React from 'react';
import createIt, { concat, map, compose, merge } from 'create-it';

import errorContainer from '../components/errorContainer';
import loggerComponent from '../components/loggerComponent';

import container from '../factories/container';
import button from '../factories/button';

import app from '../factories/app';
import todoList from '../factories/todoList';
import todoListItem from '../factories/todoListItem';
import todoController from '../factories/todoController';

const none = () => () => null;

function applyConfig(create) {
  const appendReactLibrary = concat([ React ], { isAppending: false });
  const wrapDependency = (wrapper) => map(component => {
    if (!component instanceof Object) {
      return component;
    }

    return Object.keys(component).reduce((previousValue, name) => {
      return {
        ...previousValue,
        [name]: wrapper(component[name])
      };
    }, {});
  });

  const wrapErrorContainer = wrapDependency(errorContainer);

  const wrapLoggerComponent = wrapDependency(loggerComponent);

  return compose(
    wrapErrorContainer, 
    wrapLoggerComponent,
    appendReactLibrary
  )(create);
};


function initializePrimitives(create) {
  const Container = create()(container);
  const Button = create()(button);

  return merge({ Button, Container })(create);
}

function initialize(create) {
  const TodoListItem = create()(todoListItem);
  const TodoList = create({ TodoListItem })(todoList);

  const TodoController = create()(todoController);

  const App = create({ 
    TodoList, 
    TodoController
  })(app);

  return App;
}

const App = compose(
  initialize,
  initializePrimitives,
  applyConfig
)(createIt());

export default App;
