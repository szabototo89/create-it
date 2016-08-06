import React from 'react';

const Container = (props) => {
  return <div {...props}>{props.children}</div>;
};

export default Container;