const merge = (...actualDependencies) => (create) => {
  return (...dependencies) => create(actualDependencies.map((actualDependency, index) => ({
    ...actualDependency,
    ...dependencies[index]
  })));
};

export default merge;