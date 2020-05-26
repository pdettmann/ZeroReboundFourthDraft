import React from "react";
import { unmountComponentAtNode } from "react-dom";
import Signin from "../signin";
import { UserProvider } from '../userContext';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

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

it("renders Signin page", async () => {
    let gotCalled = false;

    const mockApiClient = {
        get: ((path) => {
            if (path === '/user/profile') {
                return Promise.reject();
            }
        }),
        delete: () => {},
        post: ((path) => {
            gotCalled = true;
            if (path === '/user/auth') {
                return Promise.resolve();
            }
        }),
    };

    const component = renderer.create(
        <UserProvider>
            <Router>
                <Signin apiClient={mockApiClient} />
            </Router>
        </UserProvider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


