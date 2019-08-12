import classnames from 'classnames';

export function getStyledComponentId(componentOrProps = {}) {
  let id = componentOrProps.styledComponentId;
  if (!id) id = (componentOrProps.forwardedComponent || {}).styledComponentId;
  if (!id) return;
  return id;
}

export function reduceModifiersIntoClassObject({id, componentOrProps, modifiers}) {
  return Object.keys(modifiers).reduce(
    (result, mod) => ({
      ...result,
      [`${id}-${mod}`]: componentOrProps[mod]
    }),
    {}
  );
}

export function reduceModifiersIntoDefinitions({id, modifiers}) {
  return Object.keys(modifiers).reduce(
    (result, mod) =>
    `${result}&.${id}-${mod}{${
      typeof modifiers[mod] === 'function'
        ? modifiers[mod](props)
        : modifiers[mod]
    }}`,
    ''
  );
}

export function bemClassNames(modifiers) {
  return function (componentOrProps) {
    const id = getStyledComponentId(componentOrProps);
    if (!id) return '';

    const classObject = reduceModifiersIntoClassObject({id, componentOrProps, modifiers});

    return classnames(classObject);
  };
}

export function bemDefinitions(modifiers) {
  return function (props) {
    const id = getStyledComponentId(props);
    if (!id) return '';

    const definitions = reduceModifiersIntoDefinitions({id, modifiers});

    return definitions;
  };
}
