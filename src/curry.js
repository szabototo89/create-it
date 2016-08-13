const curry = (f, ...args) => {
  if (args.length >= f.length) {
    return f(...args);
  }

  return (...rest) => curry(f, ...args, ...rest);
};

export default curry;