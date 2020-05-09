import React from 'react';
import CreateArticle from '../createArticle';
import renderer from 'react-test-renderer';
import { unmountComponentAtNode } from "react-dom";
import { UserProvider } from '../userContext';

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

test('component renders correctly', () => {
    const component = renderer.create(
        <UserProvider>
            <CreateArticle />
        </UserProvider>
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();

});
