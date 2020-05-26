import React from 'react';
import Signup from '../signup';
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

test('Signup renders correctly', () => {
	const component = renderer.create(
		<UserProvider>
				<Signup />
		</UserProvider>
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

