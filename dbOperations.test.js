// import dbOperations
const dbModule = require('./dbOperations');

// import environment variables
require('dotenv').config({ path: './config.env' });

// declare db objects
let db;

// MongoDB URL
const url = process.env.ATLAS_URI;

// declare test data
// const user = 'testuser';

// db connection test
test('database connects', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  // test db is not null
  expect(db).not.toEqual(null);
});

// addUser - match works
test('addUser works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const foundUser = await db.collection('Users').findOne({ name: 'hello' });
  expect(foundUser).toMatchObject({ password: 'hello' });
});

// addUser - match fails
test('addUser is not ambiguous', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const foundUser = await db.collection('Users').findOne({ name: 'hello' });
  expect(foundUser).not.toMatchObject({ password: 'mynameisjoe' });
});

// getLoginTrue - match works
test('getLoginTrue works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const login = await dbModule.getLoginTrue(db, 'hello', 'hello');
  expect(login).toBe(true);
});

// getLoginTrue - match fails
test('getLoginTrue works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const login = await dbModule.getLoginTrue(db, 'hello', 'mynameisjoe');
  expect(login).not.toBe(true);
});

// getPasswordTrue - match works
test('getPasswordTrue works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const password = await dbModule.getPasswordTrue(db, 'hello', 'hello');
  expect(password).toBe(true);
});

// getPasswordTrue - match fails
test('getPasswordTrue works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const password = await dbModule.getPasswordTrue(db, 'hello', 'mynameisjoe');
  expect(password).not.toBe(true);
});

// getPasswordTrue - match fails
test('getPasswordTrue works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  await dbModule.addUser(db, 'hello', 'hello', 'hello', 'hello', 'hello', 'hello', 'Private', 'hello', 0, 0);
  const password = await dbModule.getPasswordTrue(db, 'hello', 'mynameisjoe');
  expect(password).not.toBe(true);
});

// changePassword
test('changePassword works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  db.collection('Users').remove({ name: 'yoyoyo' });
  await dbModule.addUser(db, 'yoyoyo', 'yoyoyo', 'yoyoyo', 'yoyoyo', 'yoyoyo', 'yoyoyo', 'Private', 'yoyoyo', 0, 0);
  let passwordWorks = await dbModule.getPasswordTrue(db, 'yoyoyo', 'mynameisjoe');
  expect(passwordWorks).not.toBe(true);
  await dbModule.changePassword(db, 'yoyoyo', 'mynameisjoe');
  passwordWorks = await dbModule.getPasswordTrue(db, 'yoyoyo', 'mynameisjoe');
  expect(passwordWorks).toBe(true);
});

// changePrivacy
test('changePrivacy works', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  db.collection('Users').remove({ name: 'cottoncandy' });
  await dbModule.addUser(db, 'cottoncandy', 'cottoncandy', 'cottoncandy', 'cottoncandy', 'cottoncandy', 'cottoncandy', 'Private', 'cottoncandy', 0, 0);
  let user = await dbModule.getProfile(db, 'cottoncandy');
  console.log(user);
  expect(user.privacy).not.toBe('Public');
  await dbModule.changePrivacy(db, 'cottoncandy', 'Public');
  user = await dbModule.getProfile(db, 'cottoncandy');
  expect(user.privacy).toBe('Public');
});
