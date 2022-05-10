/**
* @jest-environment jsdom
*/

import { React, render, screen } from '@testing-library/react';
import Lockout from './Lockout';
import '@testing-library/jest-dom';

test('renders learn react link', async () => {
  render(<Lockout />);
  const linkElement = screen.getByText(/ACCOUNT LOCKED OUT/i);
  expect(linkElement).toBeInTheDocument();
});
