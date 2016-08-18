import React from 'react';

const placeholder = (text) => (...props) => <div {...props}>
  {text}
</div>;

export default placeholder;