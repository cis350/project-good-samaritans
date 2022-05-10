/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, queryByAttribute,
} from '@testing-library/react';
import Signup from './Signup';
import '@testing-library/jest-dom';

const getById = queryByAttribute.bind(null, 'id');

// test('login start', () => {
//   render(<Signup />);
//   const linkElement = screen.getByText(/Good Samaritans/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('sign in ', async () => {
  const dom = render(<Signup />);
  const userfield = getById(dom.container, '1');
  user.type(userfield, 'Monkey');
  expect(userfield).toHaveValue('Monkey');
  const userfield2 = getById(dom.container, '2');
  user.type(userfield2, '123');
  expect(userfield2).toHaveValue('123');
  const userfield3 = getById(dom.container, '3');
  user.type(userfield3, '123');
  expect(userfield3).toHaveValue('123');
  const userfield4 = getById(dom.container, '4');
  user.type(userfield4, 'CA');
  expect(userfield4).toHaveValue('CA');
  const userfield5 = getById(dom.container, '5');
  user.type(userfield5, 'USA');
  expect(userfield5).toHaveValue('USA');
  const userfield6 = getById(dom.container, '6');
  user.type(userfield6, '198239');
  expect(userfield6).toHaveValue('198239');
  const userfield7 = getById(dom.container, '7');
  user.type(userfield7, 'n');
  expect(userfield7).toHaveValue('n');

  const startButton = getById(dom.container, '8');
  expect(startButton).toBeInTheDocument();
  user.click(startButton);
});
