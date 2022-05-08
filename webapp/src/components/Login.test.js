/**
* @jest-environment jsdom
*/

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { React, render, screen } from '@testing-library/react';
// import user from '@testing-library/user-event';
// import renderer from 'react-test-renderer';

import Login from './Login';

test('Login: start', () => {
  render(<Login />);
  const linkElement = screen.getByText('Username:');
  expect(linkElement).toBeInTheDocument();
});

// test('ui: login fail', () => {
//     render(<App />);
//     const linkElement = screen.getByText('Start');
//     expect(linkElement).toBeInTheDocument();
//     user.click(linkElement);

//     const linkElement2 = screen.getByText('Error: non-alphanumeric');
//     expect(linkElement2).toBeInTheDocument();
// });

// test("ui: login success", () => {
//     render(<App />);

//     const userfield = screen.getByPlaceholderText('Enter user name');
//     user.type(userfield, 'john');
//     expect(userfield).toHaveValue('john')

//     const startButton = screen.getByText('Start');
//     expect(startButton).toBeInTheDocument();
//     user.click(startButton);

//     const nextButton = screen.getByText('Next');
//     expect(nextButton).toBeInTheDocument();

// });

// test("ui: delete user", () => {
//     render(<App />);

//     const userfield = screen.getByPlaceholderText('Enter user name');
//     user.type(userfield, 'john');
//     expect(userfield).toHaveValue('john')

//     const startButton = screen.getByText('Start');
//     expect(startButton).toBeInTheDocument();
//     user.click(startButton);

//     const deleteButton = screen.getByText('Delete User');
//     expect(deleteButton).toBeInTheDocument();
//     user.click(deleteButton);

//     const startButton2 = screen.getByText('Start');
//     expect(startButton2).toBeInTheDocument();

// });

// test('ui: snapshot of login', () => {
//     const component = renderer.create(<App />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });
