import map from './map';

export default function wrapDependency(wrapper) {
  return map(component => {
    if (component.constructor !== Object) {
      return component;
    }

    return Object.keys(component).reduce((previousValue, name) => {
      return {
        ...previousValue,
        [name]: wrapper(component[name])
      };
    }, {});
  });
} 
