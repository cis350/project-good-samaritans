/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import * as np from '../modules/api';

// jest.mock('../modules/api', () => {
//   const users = [];
//   return {
//     getUsers: jest.fn(() => Promise.resolve(users)),
//   };
// });

const getById = queryByAttribute.bind(null, 'id');

test('login start', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Good Samaritans/i);
  expect(linkElement).toBeInTheDocument();
});

test('sign in ', () => {
  const dom = render(<Login />);
  const userfield = getById(dom.container, '3');
  user.type(userfield, 'Monkey');
  expect(userfield).toHaveValue('Monkey');
  const userfield2 = getById(dom.container, '4');
  user.type(userfield2, '123');
  expect(userfield2).toHaveValue('123');
  const startButton = screen.getByText(/Login/i);
  expect(startButton).toBeInTheDocument();
  user.click(startButton);
});

test('sign up ', () => {
  render(<Login />);
  const startButton2 = screen.getByText(/Signup/i);
  expect(startButton2).toBeInTheDocument();
  user.click(startButton2);
});