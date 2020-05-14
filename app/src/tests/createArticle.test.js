import React from 'react';
import CreateArticle from '../createArticle';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { UserProvider } from '../userContext';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';
import {  fireEvent } from "@testing-library/react";

let container = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

test('CreateArticle renders correctly', () => {
		const component = renderer.create(
				<UserProvider>
						<CreateArticle />
				</UserProvider>
			);
			let tree = component.toJSON();
			expect(tree).toMatchSnapshot();
});

test('Article gets created', async () => {
	const mockApiClient = {
		post: ((path) => {
			if (path === '/article/create') {
				return Promise.resolve({
					data: {
						article: {
							title: 'something',
							text: 'something else',
						},
				 }
				});
			}
			return Promise.reject();
		}),
	};

	await act (async () => {
		render(
			<UserProvider>
					<Router>
						<CreateArticle apiClient={mockApiClient} />
					</Router>
			</UserProvider>,
			container
		);
	});

	await act(async () => {
		const button =  container.querySelector('#createArticle');
		fireEvent.click(button);
	});
// add test
});
