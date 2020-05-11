import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Profile from "../profile";
import { UserProvider } from '../userContext';
import { BrowserRouter as Router } from 'react-router-dom';

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
                            }
                        ]
                    }
                })
            }

            return Promise.reject();
        }),
        delete: () => {},
        post: () => {},
    };

    // Use the asynchronous version of act to apply resolved promises
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
  });
