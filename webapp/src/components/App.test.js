/**
* @jest-environment jsdom
*/

import { React, render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Signup/i);
  expect(linkElement).toBeInTheDocument();
});
