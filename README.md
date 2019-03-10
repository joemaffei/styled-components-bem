# styled-components-bem
BEM-style modifiers for styled-components.

## Motivation

This library was inspired by [styled-components-modifiers](https://github.com/Decisiv/styled-components-modifiers), with
a few enhancements that are best explained through examples:

## Example 1: Using only styled-components

```jsx
import styled from "styled-components";

const Sample = styled.div`
  font-family: sans-serif;
  ${({ red }) => red && `color:red;`}
  ${({ large }) => large && `font-size:2em;`}
  ${({ spaced }) => spaced && `letter-spacing:0.1em;`}
  ${({ italic }) => italic && "font-style:italic;"}
  ${({ size }) => size && `font-size:${size}px;`}
`;

export default Sample;
```

**Pros:**
- concise
- easy to read

**Cons:**
- separate classNames for each combination of modifiers (lots of code duplication)
- classNames don't indicate the active modifiers in the DOM

## Example 2: Using styled-components-modifiers

```jsx
import React from "react";
import styled from "styled-components";
import { applyStyleModifiers } from "styled-components-modifiers";

const modifiers = {
  red: () => "color:red;", // it has to be a function, and don't forget the semicolon!
  large: () => "font-size:2em;",
  spaced: () => "letter-spacing:0.1em;",
  italic: () => "font-style:italic;"
  // size: ({ size }) => size && `font-size:${size}px;` // modifiers don't get props, understandably
};

const SampleStyle = styled.div`
  font-family: sans-serif;
  ${applyStyleModifiers(modifiers)};
  font-size: ${({ size }) => size && `${size}px`}; /* we have to take care of size here */
`;

const Sample = ({ red, large, spaced, italic, size, ...otherProps }) => (
  <SampleStyle
    modifiers={[ // if we want to tie modifiers to props, we have to do it like this...
      red && "red",
      large && "large",
      spaced && "spaced",
      italic && "italic"
      // size && "size" // nope, can't set size using modifiers
    ]}
    size={size} // we can pass size into SampleStyle directly instead
    {...otherProps}
  />
);

export default Sample;
```

**Pros:**
- good documentation
- relatively simple API

**Cons: (same as example 1)**
- separate classNames for each combination of modifiers (lots of code duplication)
- classNames don't indicate the active modifiers in the DOM
- requires a `modifiers` prop
- a little finicky: modifiers have to be functions which return strings ending in a semicolon

## Example 3: Using styled-components-bem

```jsx
import styled from "styled-components";
import { bemClassNames, bemDefinitions } from "styled-components-bem";

const modifiers = {
  red: "color:red", // we can use strings...
  large: () => "font-size:2em", // ...or functions
  spaced: () => "letter-spacing:0.1em",
  italic: () => "font-style:italic",
  size: ({ size }) => `font-size:${size}px` // modifiers have access to props!
};

const Sample = styled.div.attrs(props => ({
  className: bemClassNames(modifiers)(props)
}))`
  font-family: sans-serif;
  ${bemDefinitions(modifiers)}
`;

export default Sample;
```

**Pros:**
- simple API like Example 2
- each modifier creates one additional className*, which is easily identifiable in the DOM
- modifiers can be either strings or functions, and don't have to end in semicolons
- modifiers bind automatically to props, instead of relying on a `modifiers` prop
- props are available to modifier functions

(*) With one exception. See rendered HTML below.

**Cons:**
- just a bit more verbose than Example 1
- requires classNames to be passed in via `attrs`
- erm... I don't know, you tell me! I'm biased.

## Rendered HTML comparison

### Plain styled-components and styled-components-modifiers

```html
<div>
	<div class="sc-jAaTju gPulyy">red</div>
	<div class="sc-jAaTju lfwLbF">large</div>
	<div class="sc-jAaTju idSVXO">spaced</div>
	<div class="sc-jAaTju jJBzuJ">italic</div>
	<div class="sc-jAaTju KieAf">red large</div>
	<div class="sc-jAaTju gKrwWK">red large italic</div>
	<div class="sc-jAaTju hwUVjR">red spaced</div>
	<div class="sc-jAaTju gpSJtj">red spaced italic</div>
	<div class="sc-jAaTju ivCawR">large spaced</div>
	<div class="sc-jAaTju alUGD">large spaced italic</div>
	<div size="80" class="sc-jAaTju hfMhXv">font-size 80</div>
	<div size="40" class="sc-jAaTju bzQOJo">font-size 40</div>
</div>
```

### styled-components-bem

These classNames may be ugly, but they are much more like textbook BEM.

```html
<div>
	<div class="sc-cMljjf cMljjf-red dDMpDn">red</div>
	<div class="sc-cMljjf cMljjf-large dDMpDn">large</div>
	<div class="sc-cMljjf cMljjf-spaced dDMpDn">spaced</div>
	<div class="sc-cMljjf cMljjf-italic dDMpDn">italic</div>
	<div class="sc-cMljjf cMljjf-red cMljjf-large dDMpDn">red large</div>
	<div class="sc-cMljjf cMljjf-red cMljjf-large cMljjf-italic dDMpDn">red large italic</div>
	<div class="sc-cMljjf cMljjf-red cMljjf-spaced dDMpDn">red spaced</div>
	<div class="sc-cMljjf cMljjf-red cMljjf-spaced cMljjf-italic dDMpDn">red spaced italic</div>
	<div class="sc-cMljjf cMljjf-large cMljjf-spaced dDMpDn">large spaced</div>
	<div class="sc-cMljjf cMljjf-large cMljjf-spaced cMljjf-italic dDMpDn">large spaced italic</div>
	<div class="sc-cMljjf cMljjf-size fdLbeA" size="80">font-size 80</div>
	<div class="sc-cMljjf cMljjf-size eANhzL" size="40">font-size 40</div>
</div>
```
