/**
* @jest-environment jsdom
*/
// import user from '@testing-library/user-event';
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import MessageHelp from './Message';
import '@testing-library/jest-dom';
// eslint-disable-next-line no-unused-vars
import * as np from '../modules/api';

const getById = queryByAttribute.bind(null, 'id');

test('login start', () => {
  render(<MessageHelp />);
  const linkElement = screen.getByText(/Who would you like to message?/i);
  expect(linkElement).toBeInTheDocument();
});

// test('message someone', () => {
//   const dom = render(<MessageHelp />);
//   const userfield = getById(dom.container, '2');
//   user.type(userfield, 'Monkey');
//   expect(userfield).toHaveValue('Monkey');
//   const startButton = getById(dom.container, '3');
//   expect(startButton).toBeInTheDocument();
// });
