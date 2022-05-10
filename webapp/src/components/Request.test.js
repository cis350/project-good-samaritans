/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, screen, render, queryByAttribute,
} from '@testing-library/react';
import Request from './Request';
import '@testing-library/jest-dom';

const getById = queryByAttribute.bind(null, 'id');

test('fill 1', async () => {
  render(<Request accountName="Monkey" currentPrivacy="public" currentRequests="3" />);
  const linkElement = screen.getByText(/What is your issue/i);
  expect(linkElement).toBeInTheDocument();
});

test('fill 2', async () => {
  const dom = render(<Request accountName="Monkey" currentPrivacy="public" currentRequests="3" />);
  const userfield = getById(dom.container, '2');
  user.type(userfield, 'ok');
  expect(userfield).toHaveValue('ok');
  const userfield2 = getById(dom.container, '3');
  user.click(userfield2);
});
