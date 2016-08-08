import React from 'react';

const status = ({ Text }) => ({ value }) => <Text>
  Clicked: {+value} times.
</Text>;

export default status;