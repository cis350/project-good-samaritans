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
const getFriends = async (db, user) => {
  try {
    const result = await db.collection('Users').findOne({ name: user });
    return result.friends;
  } catch (err) {
    throw new Error('could not get friends');
  }
};

// get the help board w/ posts
const getHelpPosts = async (db) => {
  try {
    const result = await db.collection('Users').find({}).toArray();
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

module.exports = {
  connect,
  changePrivacy,
  getFriends,
  getHelpPosts,
  getSamaritanTexts,
};
