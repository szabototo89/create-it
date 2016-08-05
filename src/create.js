const create = (middlewares, options) => (...dependencies) => (factory) => {
  return factory(...dependencies);
};

export default create;