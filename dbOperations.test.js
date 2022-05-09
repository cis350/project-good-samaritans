// import dbOperations
const dbModule = require('./dbOperations');

// import environment variables
require('dotenv').config({ path: './config.env' });

// declare db object
let db;

// MongoDB URL
const url = process.env.ATLAS_URI;

// declare test data
const user = 'testuser';

// db connection test
test('database connects', async () => {
  // connect to the db
  db = await dbModule.connect(url);
  // test db is not null
  expect(db).not.toEqual(null);
});