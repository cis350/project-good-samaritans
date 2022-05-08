/**
* @jest-environment jsdom
*/
import user from '@testing-library/user-event';
import {
  React, render, screen, queryByAttribute,
} from '@testing-library/react';
import Profile from './Profile';
import '@testing-library/jest-dom';

let axios = require('axios');
let MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
let mock = new MockAdapter(axios);

mock.onGet("/users", { params: { searchText: "John" } }).reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});

axios
  .get("/users", { params: { searchText: "John" } })
  .then(function (response) {
    console.log(response.data);
  });

const getById = queryByAttribute.bind(null, 'id');

test('login start', () => {
  render(<Profile accountName="bruh" initialPrivacy="public" requests={3} helped={2} msgs={1} />);
  const linkElement = screen.getByText(/Training/i);
  expect(linkElement).toBeInTheDocument();
});

test('sign in ', () => {
  const dom = render(<Profile accountName="bruh" initialPrivacy="public" requests={3} helped={2} msgs={1} />);
  const userfield = getById(dom.container, 'training');
  expect(userfield).toBeInTheDocument();
});

// test('sign up ', () => {
//   render(<Profile />);
//   const startButton2 = screen.getByText(/Signup/i);
//   expect(startButton2).toBeInTheDocument();
//   user.click(startButton2);
// });
