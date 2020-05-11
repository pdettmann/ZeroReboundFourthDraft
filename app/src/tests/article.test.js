import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Article from "../article";
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

it("renders article", async () => {

    const fakeArticle = {
        id: '4',
        title: 'Test Title',
        text: 'Test Text',
        author: {
            firstName: 'Glenn',
            lastName: 'Rhee',
        }
    };

    const fakeComment = {
        id: '1',
        text: 'test comment',
        commenter: {
            firstName: 'Maggie',
            lastName: 'Rhee',
       }
    };

    const mockApiClient = {
        get: ((path) => {
            if (path === `/article/?articleId=1`) {
                return Promise.resolve({
                    data: {
                        article: fakeArticle,
                    }
                });
            }

            if (path === `/comment/findByArticleId?articleId=1`) {
                return Promise.resolve({
                    data: {
                        comments: [
                            fakeComment,
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
                <Article apiClient={mockApiClient} match={{ params: { id: '1' } }} />
              </Router>
          </UserProvider>,
          container
        );
    });

    expect(container.querySelector('h1').textContent).toBe(fakeArticle.title);
    expect(container.querySelector('div h3').textContent).toBe(`By ${fakeArticle.author.firstName} ${fakeArticle.author.lastName}`);
    expect(container.querySelector("p").textContent).toBe(fakeArticle.text);
    expect(container.querySelector("div div div h3").textContent).toBe(`${fakeComment.commenter.firstName} ${fakeComment.commenter.lastName}`);
    expect(container.querySelector("div div div p").textContent).toBe(fakeComment.text);
  });
