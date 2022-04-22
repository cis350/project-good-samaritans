// 1. Import MongoDB driver
const { MongoClient } = require('mongodb');

// 2. Connect to the DB and return the connection object
const connect = async (url) => {
  try {
    const conn = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    return conn;
  } catch (err) {
    throw new Error('could not connect to the db');
  }
};

// change the privacy of a user
const changePrivacy = async (db, name, setting) => {
  try {
    await db.collection('').updateOne(
      { user: name },
      { $set: { privacy: setting } },
    );
    const result = await db.collection('').findOne({ user: name });
    return result;
  } catch (err) {
    throw new Error('could not change privacy');
  }
};

// get the friends of a user
const getFriends = async (db, name) => {
  try {
    const result = await db.collection('').findOne({ user: name });
    return result.friends;
  } catch (err) {
    throw new Error('could not get friends');
  }
};

// get the help board w/ posts
const getHelpPosts = async (db) => {
  try {
    const result = await db.collection('').find({});
    return result;
  } catch (err) {
    throw new Error('could not get help board');
  }
};

// get the samaritan texts of a user
const getSamaritanTexts = async (db, name) => {
  try {
    const result = await db.collection('').findOne({ user: name });
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
