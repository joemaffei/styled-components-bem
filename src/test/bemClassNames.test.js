import styled from 'styled-components';
import bemClassNames from '../bemClassNames';

describe('bemClassNames', () => {
	const Div = styled.div``;
	const renderedDiv = Div.render();
	test('returns a function that returns a string', () => {
		expect(bemClassNames()()).toBe('');
	});
	test('returns poop', () => {
		expect(bemClassNames({poop: true})(renderedDiv.props)).toBe('poop');
	});
});
