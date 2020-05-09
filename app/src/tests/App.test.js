import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';

describe("App test", () => {
    test('does it work', () => {
        const { getByText } = render(<App />);
        const element = getByText('title');
        expect(element).toBeInTheDocument();
    })
})
