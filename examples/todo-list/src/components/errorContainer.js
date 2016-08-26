import React from 'react';

const ErrorContainer = (Component) => class extends React.Component {
  render() {
    try {
      return <Component {...props} />;
    }
    catch (err) {
      return <div className="error-container">
        An error has been thrown: {err}
      </div>;
    }
  }
};

export default ErrorContainer;
