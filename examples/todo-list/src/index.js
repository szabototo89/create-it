import React from 'react';
import ReactDOM from 'react-dom';
import App from './configurations/standard.config';

const items = [1, 2, 3, 4].map(value => ({
  id: value, 
  isDone: true,
  value: `Item ${value}`
}));

ReactDOM.render(
  <App items={items} />,
  document.getElementById('root')
);
