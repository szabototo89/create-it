import React from 'react';
import getDisplayName from '../utils/getDisplayName';

const loggerComponent = (Component) => {
  const isStatelessComponent = Component.constructor === Function;
  const isStatefulComponent = Component.prototype instanceof React.Component;

  const name = getDisplayName(Component);

  if (isStatelessComponent) {
    return (props) => {
      console.info(`[${name}] props has been changed: `, props);
      return <Component {...props} />;
    };
  }

  return Component;
};

export default loggerComponent;
