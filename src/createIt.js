/**
 * defaultCtor to pass to create factory
 * 
 * @param {Function} factory
 * @param {Array} dependencies
 */
export const defaultCtor = (factory, dependencies) => factory(...dependencies);

/**
 * create function is a factory produces a pure DI container to instantiate actual components with it.
 * 
 * @example
 * import { create } from 'create-it';
 * import { app, mainContent, sideBar } from 'factories';
 * import { Paragraph, Menu } from 'components';
 * 
 * const create = createIt();
 * 
 * const MainContent = create({ Paragraph })(mainContent);
 * const SideBar = create({ Menu })(sideBar);
 * const App = create({ SideBar, MainContent })(app);
 * 
 * @param {Array} middlewares: 
 * @param {any} { resolver = defaultresolver }
 * @returns Function
 */
const createIt = (middlewares = [], { ctor = defaultCtor } = {}) => {
  return (...dependencies) => (originalFactory) => ctor(middlewares.reduce(
    (actualFactory, middleware) => middleware(actualFactory, originalFactory, ctor), 
    originalFactory
  ), dependencies);
};

export default createIt;  