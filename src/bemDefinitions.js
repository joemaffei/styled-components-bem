import isFunction from 'lodash/isFunction';
import getStyledComponentId from './getStyledComponentId';

const bemDefinitions = modifiers => props => {

	const id = getStyledComponentId(props);
	if (!id) return '';

	const mods = Object.keys(modifiers);

	const definitions = mods.reduce(
    (result, mod) =>
      `${result}&.${id}_${mod}{${
				isFunction(modifiers[mod])
					? modifiers[mod](props)
					: modifiers[mod]
      }}`,
    ''
  );

	return definitions;
};

export default bemDefinitions;
