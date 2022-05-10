/**
* @jest-environment jsdom
*/
import {
  React, render, screen,
} from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom';

test('login start', () => {
  render(<Profile accountName="bruh" initialPrivacy="public" requests="3" helped="2" msgs="1" />);
  const linkElement = screen.getByText(/Training/i);
  expect(linkElement).toBeInTheDocument();
});

// test('sign up ', () => {
//   render(<Profile />);
//   const startButton2 = screen.getByText(/Signup/i);
//   expect(startButton2).toBeInTheDocument();
//   user.click(startButton2);
// });