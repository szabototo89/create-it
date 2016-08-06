import React from 'react';

const Button = (props) => {
  const { onClick } = props;

  return <button onClick={onClick}>
    {props.children}
  </button>;
};

export default Button;