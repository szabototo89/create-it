import React from 'react';

const increment = ({ Button }) => ({ onIncrement }) => <Button onClick={onIncrement}>
  Increment
</Button>;

export default increment;