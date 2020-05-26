import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Profile from "../profile";
import { UserProvider } from '../userContext';
import { BrowserRouter as Router } from 'react-router-dom';
import {  fireEvent } from "@testing-library/react";

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

it("renders user profile data", async () => {
    const fakeUser = {
        id: '1',
        firstName: "Rick",
        lastName: "Grimes",
        email: "rick.grimes@gmail.com"
    };

    let gotCalled = false;

    const mockApiClient = {
        get: ((path) => {
            if (path === '/user/profile') {
                return Promise.resolve({
                    data: {
                        user: fakeUser
                    }
                });
            }

            if (path === '/user/articles') {
                return Promise.resolve({
                    data: {
                        articles: [
                            {
                                id: 1,
                                title: 'Test article'
                            },
                            {
                                id: 2,
                                title: 'Another Article'
                            }
                        ]
                    }
                })
            }

            return Promise.reject();
        }),
        delete: ((path) => {
            if (path === '/user/logout') {
                gotCalled = true;
                return Promise.resolve()
            }
        }),
        post: () => {},
    };

    await act(async () => {
      render(
          <UserProvider>
              <Router>
                <Profile apiClient={mockApiClient} />
              </Router>
          </UserProvider>,
          container
        );
    });

    expect(container.querySelector('h1').textContent).toBe(`Welcome ${fakeUser.firstName}`);
    expect(container.querySelector("h3").textContent).toBe(`Name: ${fakeUser.firstName} ${fakeUser.lastName}`);
    expect(container.querySelector('div > div > div:nth-child(1) > a > div > h1').textContent).toBe('Test article')
    expect(container.querySelector('div > div > div:nth-child(2) > a > div > h1').textContent).toBe('Another Article')

    await act(async () => {
        const button =  container.querySelector('#logout');
        fireEvent.click(button);
    });

    expect(gotCalled).toBe(true);
});
