// 1. Import MongoDB driver
const { MongoClient } = require('mongodb');

// 2. Connect to the DB and return the connection object
const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    console.log(`Connected to the database: ${conn.databaseName}`);
    return conn;
  } catch (err) {
    throw new Error('could not connect to the db');
  }
};

// get if login was successfull
const getLoginTrue = async (db, user, pwd) => {
  try {
    const result = await db.collection('Users').findOne({ name: user });
    if (result != null && (result.password).normalize() === pwd.normalize()) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('could not login in');
  }
};

// change the privacy of a user
const changePrivacy = async (db, user, setting) => {
  try {
    await db.collection('Users').updateOne(
      { name: user },
      { $set: { privacy: setting } },
    );
    const result = await db.collection('Users').findOne({ name: user });
    return result;
  } catch (err) {
    throw new Error('could not change privacy');
  }
};

// get the friends of a user
// const getFriends = async (db, user) => {
//   try {
//     const result = await db.collection('Users').findOne({ name: user });
//     return result.friends;
//   } catch (err) {
//     throw new Error('could not get friends');
//   }
// };

// get the help board w/ posts
const getHelpPosts = async (db) => {
  try {
    const result = await db.collection('Help').find({}).toArray();
    return result;
  } catch (err) {
    throw new Error('could not get help board');
  }
};

// get the samaritan texts of a user
const getSamaritanTexts = async (db, user) => {
  try {
    const result = await db.collection('Users').findOne({ name: user });
    return result.texts;
  } catch (err) {
    throw new Error('could not get samaritan texts of user');
  }
};

// get the samaritan texts of a user
const postRequest = async (db, name, post) => {
  try {
    const result = await db.collection('Help').insertOne({ name, post });
    return result;
  } catch (err) {
    console.log(err);
    throw new Error('could not add request');
  }
};

const addUser = async (db, name, street, state, country, zip, password, privacy) => {
  try {
    const result = await db.collection('Users').insertOne(
      {
        name, street, state, country, zip, password, privacy,
      },
    );
    return result;
  } catch (err) {
    console.log(err);
    throw new Error('could not add user');
  }
};

module.exports = {
  connect,
  getLoginTrue,
  changePrivacy,
  getHelpPosts,
  getSamaritanTexts,
  postRequest,
  addUser,
};

// const main = async () => {
//   const url = process.env.ATLAS_URI;
//   const db = await connect(url);
//   const login = await getLoginTrue(db, 'Bob', 'abcd');
//   console.log(login);
//   const loginfail = await getLoginTrue(db, 'Bob', 'dududu');
//   console.log(loginfail);
// };

// main();
