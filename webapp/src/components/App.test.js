/**
* @jest-environment jsdom
*/

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { React, render } from '@testing-library/react';
// import user from '@testing-library/user-event';
// import renderer from 'react-test-renderer';

import App from './App';

/**
* UI Tests
*/

test('App: start', () => {
  render(<App />);
  // const linkElement = screen.getByText('Username');
  // expect(linkElement).toBeInTheDocument();
});
