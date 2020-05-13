import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Home from "../home";
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

it("renders home", async () => {
    const fakeArticle =  {
        id: '1',
        title: 'This is a test-article',
        text: 'Lorem Ipsum etc. etc.',
        author: {
            firstName: 'Carol',
            lastName: 'Peletier',
        }
    };

    const mockApiClient= {
        get: ((path) => {
            if (path === '/article/home') {
                return Promise.resolve({
                    data: {
                        articles: [ fakeArticle ]
                    }
                });
            }

            return Promise.reject();
        }),

    };

    await act(async () => {
      render(
          <UserProvider>
              <Router>
                <Home apiClient={mockApiClient} />
              </Router>
          </UserProvider>,
          container
        );
    });

    expect(container.querySelector('div > h1').textContent).toBe('ZeroRebound');
    expect(container.querySelector('div div div a div h2').textContent).toBe(fakeArticle.title);
    expect(container.querySelector('div div div h3').textContent).toBe(`${fakeArticle.author.firstName} ${fakeArticle.author.lastName}`)
    expect(container.querySelector('div > div > div:nth-child(1) > h3:nth-child(3)').textContent).toBe(fakeArticle.text)
  });
