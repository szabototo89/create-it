/**
 * 
 * 
 * @param {any} func
 * @returns
 */
const createMiddleware = (func) => {
  return (factory, _, resolver) => (...dependencies) => {
    const component = resolver(factory, dependencies);
    return func(component) || component;
  };
};

export default createMiddleware;