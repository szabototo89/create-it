const filter = (condition) => (middleware) => {
  return (factory, originalFactory, ...rest) => {
    return condition(originalFactory)
      ? middleware(factory, originalFactory, ...rest)
      : factory;
  }
};

export default filter;