/**
* @jest-environment jsdom
*/
import {
  React, screen, render,
} from '@testing-library/react';
import Account from './Account';
import '@testing-library/jest-dom';

test('fill 1', async () => {
  // eslint-disable-next-line react/jsx-filename-extension
  render(<Account accountName="Monkey" currentPrivacy="public" currentRequests="3" />);
  const linkElement = screen.getByText(/Street:/i);
  expect(linkElement).toBeInTheDocument();
});

// test('fill 2', async () => {
//   render(<Account accountName="Monkey" currentPrivacy="public" currentRequests="3" />);
//   const linkElement = screen.getByText(/Password:/i);
//   expect(linkElement).toBeInTheDocument();
// });
