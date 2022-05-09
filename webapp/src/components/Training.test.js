/**
* @jest-environment jsdom
*/
import {
  React, screen, render,
} from '@testing-library/react';
import Training from './Training';
import '@testing-library/jest-dom';

test('fill 1', () => {
  render(<Training accountName="Monkey" currentPrivacy="public" currentRequests="3" />);
  const linkElement = screen.getByText(/Training Page/i);
  expect(linkElement).toBeInTheDocument();
});
