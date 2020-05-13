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

    const fakeCommentOne = {
        id: '1',
        text: 'test comment',
        commenter: {
            firstName: 'Maggie',
            lastName: 'Rhee',
       }
    };

    const fakeCommentTwo = {
        id: '2',
        text: 'test comment two',
        commenter: {
            firstName: 'Hershel',
            lastName: 'Greene',
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
                            fakeCommentOne,
                        ]
                    }
                })
            }

            return Promise.reject();
        }),
        delete: () => {},
        post: ((path) => {
            if (path === '/comment/create') {
                return Promise.resolve({
                    data: {
                       comment: fakeCommentTwo,
                    }
                })
            }
            return Promise.reject();
        }),
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
    expect(container.querySelector("div div div h3").textContent).toBe(`${fakeCommentOne.commenter.firstName} ${fakeCommentOne.commenter.lastName}`);
    expect(container.querySelector("div div div p").textContent).toBe(fakeCommentOne.text);

    await act(async () => {
        const button =  container.querySelector('div > button:nth-child(17)');
        button.dispatchEvent(new MouseEvent('click'));
        render(
            <UserProvider>
              <Router>
                <Article apiClient={mockApiClient} match={{ params: { id: '1' } }} />
              </Router>
          </UserProvider>,
          container
        )
    })

    // expect(container.querySelector("div > div > div:nth-child(2) > h3").textContent).toBe(`${fakeCommentTwo.commenter.firstName} ${fakeCommentTwo.commenter.lastName}`);
    // expect(container.querySelector("div div div p").textContent).toBe(fakeCommentTwo.text);
});
