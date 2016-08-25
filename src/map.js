const map = (fn) => (create) => {
  return (...dependencies) => {
    return create(...dependencies.map(dependency => fn(dependency)));
  }
};

export default map;
