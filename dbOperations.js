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

// login - username was correct but password incorrect
const getPasswordTrue = async (db, user, pwd) => {
  try {
    const result = await db.collection('Users').findOne({ name: user });
    if (result != null && pwd.normalize() !== (result.password).normalize()) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error('wrong password');
  }
};

// change the password of a user
const changePassword = async (db, user, newPwd) => {
  try {
    await db.collection('Users').updateOne(
      { name: user },
      { $set: { password: newPwd } },
    );
    const result = await db.collection('Users').findOne({ name: user });
    return result;
  } catch (err) {
    throw new Error('could not reset password');
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

// increment the number of requests made by user
const incrementRequest = async (db, user) => {
  try {
    await db.collection('Users').updateOne(
      { name: user },
      { $inc: { requestsNo: 1 } },
    );
    const result = await db.collection('Users').findOne({ name: user });
    return result;
  } catch (err) {
    throw new Error('could not increment request number');
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
    const result = await db.collection('Help').find().toArray();
    return result;
  } catch (err) {
    throw new Error('could not get help board');
  }
};

// gets specific help post
const getSpecificHelp = async (db, user) => {
  try {
    const result = await db.collection('Help').find(
      {
        name: user,
      },
    ).toArray();
    return result;
  } catch (err) {
    throw new Error('could not find user');
  }
};

const deleteHelp = async (db, user, message, helper) => {
  try {
    await db.collection('Help').remove(
      {
        name: user,
        post: message,
      },
    );

    const result2 = await db.collection('Users').updateOne(
      { name: helper },
      { $inc: { helpedNo: 1 } },

    );

    return result2;
  } catch (err) {
    throw new Error('could not find user');
  }
};

// get the samaritan texts of a user
// const getSamaritanTexts = async (db, user) => {
//   try {
//     const result = await db.collection('Users').findOne({ name: user });
//     return result.texts;
//   } catch (err) {
//     throw new Error('could not get samaritan texts of user');
//   }
// };

// post a request to the Help DB
const postRequest = async (db, user, request) => {
  try {
    const found = await db.collection('Help').findOne({ name: user });
    // edits the post
    if (found !== null) {
      await db.collection('Help').updateOne(
        { name: user },
        { $set: { post: request } },
      );
    } else {
      await db.collection('Help').insertOne({ name: user, post: request });
    }
  } catch (err) {
    throw new Error('could not add request');
  }
};

// adds the user
const addUser = async (
  db,
  name,
  street,
  state,
  country,
  zip,
  password,
  privacy,
  date,
  helpedNo,
  requestsNo,
) => {
  try {
    const result = await db.collection('Users').insertOne(
      {
        name, street, state, country, zip, password, privacy, date, helpedNo, requestsNo,
      },
    );
    return result;
  } catch (err) {
    throw new Error('could not add user');
  }
};

// gets the user's profile
const getProfile = async (db, user) => {
  try {
    const result = await db.collection('Users').findOne(
      {
        name: user,
      },
    );
    return result;
  } catch (err) {
    throw new Error('could not find user');
  }
};

const addMessage = async (db, name, name2, message, time) => {
  try {
    const result = await db.collection('Messages').insertOne(
      {
        from: name,
        to: name2,
        msg: message,
        tme: time,
      },
    );
    return result;
  } catch (err) {
    throw new Error('could not add message');
  }
};

const getMessages = async (db, name, name2) => {
  try {
    const result = await db.collection('Messages').find(
      {
        $or: [{ from: name, to: name2 }, { from: name2, to: name },
        ],
      },
    ).toArray();
    return result;
  } catch (err) {
    throw new Error('could not find history of messages');
  }
};

const soloGetMessages = async (db, name) => {
  try {
    const result = await db.collection('Messages').find(
      {
        $or: [{ to: name },
        ],
      },
    ).toArray();
    return result;
  } catch (err) {
    throw new Error('could not find history of messages');
  }
};

module.exports = {
  connect,
  getLoginTrue,
  getPasswordTrue,
  changePrivacy,
  getHelpPosts,
  postRequest,
  addUser,
  getProfile,
  addMessage,
  getMessages,
  changePassword,
  incrementRequest,
  getSpecificHelp,
  deleteHelp,
  soloGetMessages,
};
