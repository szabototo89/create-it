const createIt = (middlewares = []) => (...dependencies) => (factory) => factory(...dependencies);

export default createIt;