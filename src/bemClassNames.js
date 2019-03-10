import classnames from 'classnames';
import getStyledComponentId from './getStyledComponentId';

const bemClassNames = modifiers => componentOrProps => {
  const id = getStyledComponentId(componentOrProps);
  if (!id) return '';

  const classObject = Object.keys(modifiers).reduce(
    (result, mod) => ({
      ...result,
      [`${id}-${mod}`]: componentOrProps[mod]
    }),
    {}
  );

  return classnames(classObject);
};

export default bemClassNames;
