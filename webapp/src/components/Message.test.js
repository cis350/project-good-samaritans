/**
* @jest-environment jsdom
*/
// import user from '@testing-library/user-event';
import {
  React, render, queryByAttribute,
} from '@testing-library/react';
import Message from './Message';
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

test('login start', async () => {
  const dom = render(<Message />);
  const startButton = getById(dom.container, '2');
  expect(startButton).toBeInTheDocument();
});

// test('message someone', () => {
//   const dom = render(<Message />);
//   const userfield = getById(dom.container, '1');
//   user.type(userfield, 'Monkey');
//   expect(userfield).toHaveValue('Monkey');
//   const startButton = getById(dom.container, '2');
//   expect(startButton).toBeInTheDocument();
//   user.click(startButton);
// });
