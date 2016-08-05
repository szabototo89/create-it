/**
 * 
 * 
 * @param {any} func
 * @returns
 */
const createMiddleware = (func) => {
  return (factory, _, ctor) => (...dependencies) => {
    const component = ctor(factory, dependencies);
    return func(component) || component;
  };
};

export default createMiddleware;