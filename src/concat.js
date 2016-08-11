const concat = (...actualDependencies) => (create) => {
  return (...dependencies) => create(...actualDependencies, ...dependencies); 
};

export default concat;