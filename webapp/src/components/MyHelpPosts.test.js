/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import MyHelpPosts from './MyHelpPosts';
import '@testing-library/jest-dom';

const getById = queryByAttribute.bind(null, 'id');

test('login start', () => {
  render(<MyHelpPosts accountName="Monkey" />);
  const linkElement = screen.getByText(/Your Help Posts:/i);
  expect(linkElement).toBeInTheDocument();
});

// test('sign up ', () => {
//   render(<Profile />);
//   const startButton2 = screen.getByText(/Signup/i);
//   expect(startButton2).toBeInTheDocument();
//   user.click(startButton2);
// });
