import React from 'react';

const Text = (props) => {
  return <p {...props}>{props.children}</p>;
};

export default Text;