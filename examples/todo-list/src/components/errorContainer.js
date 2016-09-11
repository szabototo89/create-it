import React from 'react';
import getDisplayName from '../utils/getDisplayName';

const ErrorComponent = ({ error, componentName }) => <div className={`error-container error-container--${componentName}`}>
  <span>[{componentName}] An error has been thrown:</span> 
  <span className="error-container__message">{error.message ? error.message : error}</span>
</div>;

const wrapIntoErrorContainer = (Component) => {
  const WrappedComponent = (props) => {
    try {
      return Component(props);
    } catch (error) {
      console.error(error);
      return <ErrorComponent error={error} componentName={getDisplayName(Component)} />;
    }
  };

  WrappedComponent.displayName = `ErrorContainer(${getDisplayName(Component)})`;

  return WrappedComponent;
}

const wrapIntoReactErrorContainer = (Component) => {
  class WrappedComponent extends Component {
    constructor(...args) {
      super(...args);
    }

    render() {
      try {
        return super.render();
      }
      catch (error) {
        console.error(error);
        return <ErrorComponent error={error} componentName={getDisplayName(Component)} />;
      }
    }
  }

  WrappedComponent.displayName = `ErrorContainer(${getDisplayName(Component)})`;

  return WrappedComponent;
};

const ErrorContainer = (Component) => {
  const isStatelessComponent = Component.constructor === Function;
  const isStatefulComponent = Component.prototype instanceof React.Component;

  if (isStatefulComponent) {
    return wrapIntoReactErrorContainer(Component);
  }

  if (isStatelessComponent) {
    return wrapIntoErrorContainer(Component);
  }
  
  return Component;
};


export default ErrorContainer;
