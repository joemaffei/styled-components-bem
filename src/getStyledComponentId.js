import get from 'lodash/get';

const getStyledComponentId = componentOrProps => {
	let id = get(componentOrProps, 'styledComponentId');
	if (!id) id = get(componentOrProps, 'forwardedComponent.styledComponentId');
	if (!id) return;
	return id.replace(/^sc\-/, '');
}

export default getStyledComponentId;
