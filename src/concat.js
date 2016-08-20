const concat = (actualDependencies = [], { isAppending = true } = {}) => (create) => {
  const calculateDependencies = (dependencies) => 
      isAppending 
        ? [ ...actualDependencies, ...dependencies ]
        : [ ...dependencies, ...actualDependencies ];

  return (...dependencies) => create(
    ...calculateDependencies(dependencies)
  );
};

export default concat;