import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("App test", () => {
    test('does it work', () => {
        const { getByText } = render(<App />);
        const element = getByText('ZeroRebound');
        expect(element).toBeInTheDocument();
    })
})
