import styled from 'styled-components';
import getStyledComponentId from '../getStyledComponentId';

describe('getStyledComponentId', () => {
  const mockProps = {
    forwardedComponent: {
      styledComponentId: 'sc-abcxyz'
    }
  };
  const Div = styled.div``;
  const renderedDiv = Div.render();
  const divProps = renderedDiv.props;
  const expectedId = divProps.forwardedComponent.styledComponentId.substr(3);

  test('returns undefined when called with no arguments', () => {
    expect(getStyledComponentId()).toBeUndefined;
  });

  test('returns undefined when called an invalid argument', () => {
    expect(getStyledComponentId({a:1})).toBeUndefined;
  });

  test('returns the correct id when called with a valid argument', () => {
    const expectedResult = mockProps.forwardedComponent.styledComponentId.substr(3);
    expect(getStyledComponentId(mockProps)).toBe(expectedResult);
  });

  test('returns the correct id when called with a styled component\'s props', () => {
    expect(getStyledComponentId(divProps)).toBe(expectedId);
  });

  test('returns the correct id when called on a component', () => {
    expect(getStyledComponentId(Div)).toBe(expectedId);
  });
});
