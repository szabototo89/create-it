const merge = (...actualDependencies) => (create) => {
  return (...dependencies) => {
    const depsSize = Math.max(actualDependencies.length, dependencies.length);
    const deps = Array(depsSize).fill({});

    return create(...deps.map((_, index) => ({
      ...(actualDependencies[index] || {}),
      ...(dependencies[index] || {})
    })));
  }
};

export default merge;