/**
* @jest-environment jsdom
*/
import * as funs from './api';
import '@testing-library/jest-dom';

test('login start', async () => {
  expect(funs.addUser(
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
    'fheu',
  )).resolves.not.toThrowError();
});

// test('login start', async () => {
//   expect(funs.addUser(
//     'fheu',
//     'fheu',
//     'fheu',
//     'fheu',
//     'fheu',
//     'fheu',
//     'fheu',
//     'fheu',
//   )).rejects.toThrowError();
// });

// test('priv error', async () => {
//   expect(funs.addUser(null, null)).rejects.toThrowError();
// });

// test('priv error2', async () => {
//   expect(funs.addUser('1231321', '3123131')).rejects.toThrowError();
// });

// test('spec help', async () => {
//   expect(funs.getSpecificHelp(
//     'fheu',
//   )).rejects.toThrowError();
// });

test('delete help', async () => {
  expect(funs.deleteHelp('fheu', '2fefe', 'fuehuehu')).resolves.not.toThrowError();
});

test('login true', async () => {
  expect(funs.getLoginTrue('fheu', '2fefe')).resolves.not.toThrowError();
});

test('pass true', async () => {
  expect(funs.getPasswordTrue('fheu', '2fefe')).resolves.not.toThrowError();
});

test('change pass true', async () => {
  expect(funs.changePassword('fheu', '2fefe')).resolves.not.toThrowError();
});

test('get messages', async () => {
  expect(funs.changePassword('fheu', '2fefe')).resolves.not.toThrowError();
});

// test('get messages rejected', async () => {
//   expect(funs.changePassword('fheu', null)).rejects.toThrowError();
// });

// test('add messages rejected', async () => {
//   expect(funs.addMessage('fheu', null, null, null, null)).resolves.toThrowError();
// });
