/* eslint-disable no-useless-catch */
const axios = require('axios');

const rootURL = 'http://localhost:5000';

// profile page - sends request to change the privacy setting
export async function changePrivacy(name, setting) {
  if (!name || !setting) {
    throw new Error('no privacy setting');
  }

  try {
    await axios.put(`${rootURL}/user/${name}/privacy`, { privacy: setting });
    return;
  } catch (err) {
    throw err;
  }
}

export async function addUser(name, street, state, country, zip, password, privacy) {
  if (!name || !street || !state || !country || !zip || !password) {
    throw new Error('field error');
  }

  try {
    await axios.put(`${rootURL}/user/${name}/${street}/${state}/${country}/${zip}}/${password}/${privacy}`);
    return;
  } catch (err) {
    throw err;
  }
}

export async function addMessage(name, name2, message, time) {
  if (!name || !name2 || !message || !time) {
    throw new Error('field error');
  }

  try {
    await axios.put(`${rootURL}/message/${name}/${name2}/${message}/${time}`);
    return;
  } catch (err) {
    throw err;
  }
}

export async function getMessages(name, name2) {
  if (!name || !name2) {
    throw new Error('field error');
  }

  try {
    const result = await axios.get(`${rootURL}/message/${name}/${name2}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}

export async function getLoginTrue(name, password) {
  if (!name || !password) {
    return false;
  }

  try {
    const result = await axios.get(`${rootURL}/login/${name}/${password}`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

// profile page - gets the current list of help posts
export async function postRequest(name, post) {
  try {
    await axios.post(`${rootURL}/request/${name}/${post}`);
  } catch (err) {
    throw err;
  }
}

// profile page - get the user's friends
// export async function getFriends(name) {
//   if (!name) {
//     throw new Error('no user given');
//   }

//   try {
//     const result = await axios.get(`${rootURL}/friends/${name}`);
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

// profile page - gets the current list of help posts
export async function getHelpPosts() {
  try {
    const result = await axios.get(`${rootURL}/help`);
    return result.data.data;
  } catch (err) {
    throw err;
  }
}

// profile page - gets the current list of people you are currently helping
export async function getSamaritanTexts(name) {
  if (!name) {
    throw new Error('no user given');
  }

  try {
    const result = await axios.get(`${rootURL}/texts/${name}`);
    return result.data;
  } catch (err) {
    throw err;
  }
}
