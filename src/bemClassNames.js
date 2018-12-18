import classnames from 'classnames';
import getStyledComponentId from './getStyledComponentId';

const bemClassNames = modifiers => componentOrProps => {

	const id = getStyledComponentId(componentOrProps);
	if (!id) return '';

	const mods = Object.keys(modifiers);

	const classObject = mods.reduce(
		(result, mod) => ({
			...result,
			[`${id}_${mod}`]: componentOrProps[mod]
		}),
		{}
	);

	return classnames(classObject);
};

export default bemClassNames;
