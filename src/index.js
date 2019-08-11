import classnames from 'classnames';

export const getStyledComponentId = (componentOrProps = {}) => {
  let id = componentOrProps.styledComponentId;
  if (!id) id = (componentOrProps.forwardedComponent || {}).styledComponentId;
  if (!id) return;
  return id;
}

export const bemClassNames = modifiers => componentOrProps => {
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

export const bemDefinitions = modifiers => props => {
  const id = getStyledComponentId(props);
  if (!id) return '';

  const definitions = Object.keys(modifiers).reduce(
    (result, mod) =>
    `${result}&.${id}-${mod}{${
      typeof modifiers[mod] === 'function'
        ? modifiers[mod](props)
        : modifiers[mod]
    }}`,
    ''
  );

  return definitions;
};
