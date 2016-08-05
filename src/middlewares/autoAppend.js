/**
 * 
 * 
 * @param {any} appendix
 * @returns
 */
const autoAppend = (...appendix) => {
  return (factory, _, ctor) => (...dependencies) => ctor(factory, [...dependencies, ...appendix]);
};

export default autoAppend;