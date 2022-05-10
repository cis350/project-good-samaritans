/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom';

const getById = queryByAttribute.bind(null, 'id');

test('login start', async () => {
  render(<Login />);
  const linkElement = screen.getByText(/Good Samaritans/i);
  expect(linkElement).toBeInTheDocument();
});

test('sign in ', async () => {
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

test('sign up ', async () => {
  render(<Login />);
  const startButton2 = screen.getByText(/Signup/i);
  expect(startButton2).toBeInTheDocument();
  user.click(startButton2);
});

test('forgot password', async () => {
  render(<Login />);
  const startButton2 = screen.getByText(/Forgot Password?/i);
  expect(startButton2).toBeInTheDocument();
  user.click(startButton2);
});
