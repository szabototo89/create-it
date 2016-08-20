const compose = (...functions) => {
  if (functions.length === 0) {
    return x => x;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  const lastFunction = functions[functions.length - 1];
  const restFunctions = functions.slice(0, -1);

  return (...args) => restFunctions.reduceRight(
    (previousValue, currentValue) => 
      currentValue(previousValue), lastFunction(...args));
};

export default compose;