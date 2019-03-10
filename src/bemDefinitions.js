import getStyledComponentId from './getStyledComponentId';

const bemDefinitions = modifiers => props => {
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

export default bemDefinitions;
