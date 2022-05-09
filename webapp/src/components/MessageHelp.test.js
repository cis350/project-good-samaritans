/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import Message2 from './MessageHelp';
import '@testing-library/jest-dom';

const getById = queryByAttribute.bind(null, 'id');

test('login start', () => {
  render(<Message2 />);
  const linkElement = screen.getByText(/new message:/i);
  expect(linkElement).toBeInTheDocument();
});

test('message someone', () => {
  const dom = render(<Message2 accountName="Monkey" secondName="Bob Oke" />);
  const userfield = getById(dom.container, '2');
  user.type(userfield, 'Monkey');
  expect(userfield).toHaveValue('Monkey');
  const startButton = getById(dom.container, '3');
  expect(startButton).toBeInTheDocument();
  user.click(startButton);
});
