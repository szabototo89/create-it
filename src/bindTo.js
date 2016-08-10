const bindTo = (create, { mergeFirstDependency } = {}) => (actualDependency, ...restActualDependencies) => (dependency, ...restDependencies) => {
  if (mergeFirstDependency) {
    return create(
      { ...actualDependency, ...dependency }, 
      ...restActualDependencies, 
      ...restDependencies
    );
  }

  return create([ actualDependency, ...restActualDependencies, dependency, ...restDependencies ]);
};

export default bindTo; 